"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

export default function useReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "1");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    container.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [containerRef]);
}
