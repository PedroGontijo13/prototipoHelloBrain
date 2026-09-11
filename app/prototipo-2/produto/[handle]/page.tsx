import { notFound } from "next/navigation";
import "../../design-system.css";
import ProductPageView from "@/components/proto2/ProductPageView";
import { productPages, type ProductHandle } from "@/lib/proto2-data";

type Params = Promise<{ handle: string }>;

export function generateStaticParams() {
  return Object.keys(productPages).map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { handle } = await params;
  const product = productPages[handle as ProductHandle];
  if (!product) return {};
  return {
    title: `Hellobrain ${product.name} — Protótipo 2`,
    description: product.lead,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { handle } = await params;
  if (!productPages[handle as ProductHandle]) notFound();
  return <ProductPageView handle={handle as ProductHandle} />;
}
