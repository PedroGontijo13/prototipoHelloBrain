#!/usr/bin/env python3
"""
Scrapes a website's pages + (if Shopify) product catalog, saving:
- content as Markdown files (one per page/product)
- every referenced image, downloaded at the highest resolution available
- an index.md summarizing everything captured

Usage:
  python3 scrape_site.py <base_url> [--out DIR] [--max-pages N] [--include-policies] [--delay SECONDS]

Only meant to be pointed at sites the user owns or is authorized to copy content from
(this skill exists to pull a company's own current site into a local design-reference folder).
"""
from __future__ import annotations

import argparse
import hashlib
import re
import sys
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse, urlunparse, parse_qsl, urlencode

import requests
from bs4 import BeautifulSoup, NavigableString, Tag

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; SiteReferenceBot/1.0; +local design reference tool)"}

SKIP_PATH_SUBSTRINGS = ["/cart", "/checkout", "/account", "/a/checkout"]
POLICY_SUBSTRINGS = ["/policies/"]

IMG_EXT_RE = re.compile(r"\.(jpe?g|png|gif|webp|avif|svg)(\?|$)", re.IGNORECASE)


def slugify(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-") or "page"


def normalize_domain(url: str) -> str:
    return urlparse(url).netloc


def upgrade_shopify_image_url(url: str) -> str:
    """Strip the `width=` query param Shopify uses to serve a resized image, so we grab full-res."""
    parsed = urlparse(url)
    if "cdn.shopify.com" not in parsed.netloc and "/cdn/shop/" not in parsed.path:
        return url
    q = [(k, v) for k, v in parse_qsl(parsed.query) if k.lower() != "width"]
    return urlunparse(parsed._replace(query=urlencode(q)))


def abs_url(base: str, maybe_relative: str) -> str:
    if maybe_relative.startswith("//"):
        return "https:" + maybe_relative
    return urljoin(base, maybe_relative)


class ImageStore:
    def __init__(self, images_root: Path, session: requests.Session, delay: float):
        self.images_root = images_root
        self.session = session
        self.delay = delay
        self.url_to_local: dict[str, str] = {}
        self.count = 0

    def fetch(self, url: str, subfolder: str) -> str | None:
        if not url or url.startswith("data:"):
            return None
        url = upgrade_shopify_image_url(url)
        if url in self.url_to_local:
            return self.url_to_local[url]
        parsed = urlparse(url)
        name = Path(parsed.path).name or "image"
        if not IMG_EXT_RE.search(name):
            name += ".jpg"
        dest_dir = self.images_root / subfolder
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest = dest_dir / name
        if dest.exists():
            h = hashlib.sha1(url.encode()).hexdigest()[:8]
            dest = dest_dir / f"{dest.stem}-{h}{dest.suffix}"
        try:
            time.sleep(self.delay)
            resp = self.session.get(url, headers=HEADERS, timeout=20)
            resp.raise_for_status()
            dest.write_bytes(resp.content)
        except Exception as e:
            print(f"  [img skip] {url} -> {e}", file=sys.stderr)
            return None
        rel = f"images/{subfolder}/{dest.name}"
        self.url_to_local[url] = rel
        self.count += 1
        return rel


def html_to_markdown(node, base_url: str, images: ImageStore, subfolder: str, out: list[str]):
    if isinstance(node, NavigableString):
        text = str(node).strip()
        if text:
            out.append(text)
        return
    if not isinstance(node, Tag):
        return
    if node.name in ("script", "style", "noscript", "template", "svg", "path"):
        return

    if node.name in ("h1", "h2", "h3", "h4", "h5", "h6"):
        level = int(node.name[1])
        text = node.get_text(" ", strip=True)
        if text:
            out.append("\n" + ("#" * level) + " " + text + "\n")
        return
    if node.name == "img":
        src = node.get("src") or node.get("data-src") or ""
        srcset = node.get("srcset") or node.get("data-srcset") or ""
        if srcset:
            candidates = [c.strip().split(" ")[0] for c in srcset.split(",") if c.strip()]
            if candidates:
                src = candidates[-1]
        if src:
            full = abs_url(base_url, src)
            local = images.fetch(full, subfolder)
            alt = node.get("alt", "").strip()
            if local:
                out.append(f"\n![{alt}]({local})\n")
        return
    if node.name == "br":
        out.append("\n")
        return
    if node.name == "hr":
        out.append("\n---\n")
        return
    if node.name == "a":
        text = node.get_text(" ", strip=True)
        href = node.get("href", "")
        if text and href:
            out.append(f"[{text}]({abs_url(base_url, href)})")
        elif text:
            out.append(text)
        for child in node.find_all("img", recursive=True):
            html_to_markdown(child, base_url, images, subfolder, out)
        return
    if node.name in ("strong", "b"):
        text = node.get_text(" ", strip=True)
        if text:
            out.append(f"**{text}**")
        return
    if node.name in ("em", "i"):
        text = node.get_text(" ", strip=True)
        if text:
            out.append(f"*{text}*")
        return
    if node.name == "li":
        text = node.get_text(" ", strip=True)
        if text:
            out.append("\n- " + text)
        for child in node.find_all("img", recursive=True):
            html_to_markdown(child, base_url, images, subfolder, out)
        return
    if node.name in ("p", "div", "section", "article", "header", "footer", "span", "ul", "ol", "figure", "figcaption"):
        style = node.get("style", "")
        bg = re.search(r"background-image:\s*url\(['\"]?([^'\")]+)", style)
        if bg:
            local = images.fetch(abs_url(base_url, bg.group(1)), subfolder)
            if local:
                out.append(f"\n![]({local})\n")
        if node.name in ("li",):
            return
        for child in node.children:
            html_to_markdown(child, base_url, images, subfolder, out)
        if node.name == "p":
            out.append("\n")
        return
    # fallback: recurse into unknown containers (button, table, etc.)
    for child in node.children:
        html_to_markdown(child, base_url, images, subfolder, out)


def render_markdown(fragment_soup, base_url: str, images: ImageStore, subfolder: str) -> str:
    out: list[str] = []
    for child in fragment_soup.children:
        html_to_markdown(child, base_url, images, subfolder, out)
    text = " ".join(out)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r" ?\n ?", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip() + "\n"


def discover_links(soup: BeautifulSoup, base_url: str, domain: str, include_policies: bool) -> set[str]:
    found = set()
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.startswith("#") or href.startswith("mailto:") or href.startswith("tel:"):
            continue
        full = abs_url(base_url, href)
        parsed = urlparse(full)
        if parsed.netloc and parsed.netloc != domain:
            continue
        path = parsed.path or "/"
        if any(s in path for s in SKIP_PATH_SUBSTRINGS):
            continue
        if not include_policies and any(s in path for s in POLICY_SUBSTRINGS):
            continue
        if path.startswith("/products/") or path.startswith("/pages/") or path == "/":
            found.add(urlunparse(parsed._replace(query="", fragment="")))
    return found


def scrape_page(url: str, session: requests.Session, images: ImageStore, out_dir: Path, domain: str, include_policies: bool):
    resp = session.get(url, headers=HEADERS, timeout=20)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    path = urlparse(url).path
    if path in ("", "/"):
        slug = "home"
        section = "pages"
    elif path.startswith("/pages/"):
        slug = slugify(path.split("/pages/")[1])
        section = "pages"
    else:
        slug = slugify(path)
        section = "pages"

    title = soup.title.get_text(strip=True) if soup.title else slug
    meta_desc_tag = soup.find("meta", attrs={"name": "description"})
    meta_desc = meta_desc_tag["content"].strip() if meta_desc_tag and meta_desc_tag.get("content") else ""

    main = soup.find("main") or soup.body or soup
    body_md = render_markdown(main, url, images, f"pages/{slug}")

    md = f"# {title}\n\nURL de origem: {url}\n"
    if meta_desc:
        md += f"\n> {meta_desc}\n"
    md += "\n---\n\n" + body_md

    dest = out_dir / "content" / "pages" / f"{slug}.md"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(md, encoding="utf-8")

    links = discover_links(soup, url, domain, include_policies)
    return dest, links


def scrape_products(base_url: str, session: requests.Session, images: ImageStore, out_dir: Path, max_products: int):
    saved = []
    page = 1
    fetched = 0
    while fetched < max_products:
        list_url = urljoin(base_url, f"/products.json?limit=250&page={page}")
        try:
            resp = session.get(list_url, headers=HEADERS, timeout=20)
            resp.raise_for_status()
            data = resp.json()
        except Exception as e:
            print(f"  [products.json skip] {list_url} -> {e}", file=sys.stderr)
            break
        products = data.get("products", [])
        if not products:
            break
        for p in products:
            if fetched >= max_products:
                break
            handle = p.get("handle", slugify(p.get("title", "product")))
            title = p.get("title", handle)
            body_html = p.get("body_html") or ""
            frag = BeautifulSoup(body_html, "html.parser")
            body_md = render_markdown(frag, base_url, images, f"products/{handle}")

            variants = p.get("variants", [])
            price_lines = []
            for v in variants:
                label = v.get("title", "Default")
                price = v.get("price", "")
                compare = v.get("compare_at_price")
                line = f"- {label}: R$ {price}"
                if compare and compare != price:
                    line += f" (de R$ {compare})"
                price_lines.append(line)

            image_lines = []
            for img in p.get("images", []):
                local = images.fetch(img.get("src", ""), f"products/{handle}")
                if local:
                    alt = (img.get("alt") or "").strip()
                    image_lines.append(f"![{alt}]({local})")

            md = f"# {title}\n\nURL de origem: {urljoin(base_url, '/products/' + handle)}\n"
            md += f"\nHandle: `{handle}` · Vendor: {p.get('vendor', '')}\n"
            if price_lines:
                md += "\n## Preços\n" + "\n".join(price_lines) + "\n"
            if image_lines:
                md += "\n## Imagens\n" + "\n".join(image_lines) + "\n"
            md += "\n## Descrição\n\n" + body_md

            dest = out_dir / "content" / "products" / f"{handle}.md"
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(md, encoding="utf-8")
            saved.append(dest)
            fetched += 1
        page += 1
        if page > 5:
            break
    return saved


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("base_url")
    ap.add_argument("--out", default=None, help="Output directory (default: reference/<domain>)")
    ap.add_argument("--max-pages", type=int, default=25)
    ap.add_argument("--max-products", type=int, default=60)
    ap.add_argument("--include-policies", action="store_true")
    ap.add_argument("--delay", type=float, default=0.15)
    args = ap.parse_args()

    base_url = args.base_url if args.base_url.startswith("http") else "https://" + args.base_url
    domain = normalize_domain(base_url)
    out_dir = Path(args.out) if args.out else Path("reference") / slugify(domain)
    out_dir.mkdir(parents=True, exist_ok=True)

    session = requests.Session()
    images = ImageStore(out_dir / "images", session, args.delay)

    visited: set[str] = set()
    queue = [urljoin(base_url, "/")]
    pages_done = []

    print(f"Scraping {base_url} -> {out_dir}")

    while queue and len(visited) < args.max_pages:
        url = queue.pop(0)
        if url in visited:
            continue
        visited.add(url)
        try:
            time.sleep(args.delay)
            dest, links = scrape_page(url, session, images, out_dir, domain, args.include_policies)
            pages_done.append((url, dest))
            print(f"  [page] {url} -> {dest}")
            for link in links:
                if link not in visited and "/products/" not in urlparse(link).path:
                    queue.append(link)
        except Exception as e:
            print(f"  [page skip] {url} -> {e}", file=sys.stderr)

    print("Scraping product catalog (Shopify products.json)...")
    products_done = scrape_products(base_url, session, images, out_dir, args.max_products)
    for dest in products_done:
        print(f"  [product] {dest}")

    index_lines = [
        f"# Referência de conteúdo — {domain}",
        "",
        f"Extraído de: {base_url}",
        "",
        f"Total de imagens baixadas: {images.count}",
        "",
        "## Páginas",
    ]
    for url, dest in pages_done:
        index_lines.append(f"- [{url}]({dest.relative_to(out_dir)})")
    index_lines.append("\n## Produtos")
    for dest in products_done:
        index_lines.append(f"- {dest.relative_to(out_dir)}")

    (out_dir / "index.md").write_text("\n".join(index_lines) + "\n", encoding="utf-8")
    print(f"\nPronto. {len(pages_done)} páginas, {len(products_done)} produtos, {images.count} imagens.")
    print(f"Índice: {out_dir / 'index.md'}")


if __name__ == "__main__":
    main()
