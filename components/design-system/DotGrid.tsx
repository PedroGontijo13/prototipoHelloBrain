"use client";

import * as React from "react";
import { cn } from "./cn";

export type DotGridProps = React.HTMLAttributes<HTMLDivElement>;

/** Decorative dot-grid texture. Absolutely position it behind content and keep `aria-hidden`. */
export const DotGrid = React.forwardRef<HTMLDivElement, DotGridProps>(({ className, ...props }, ref) => (
  <div ref={ref} aria-hidden="true" className={cn("pointer-events-none bg-dot-grid bg-dot-grid", className)} {...props} />
));

DotGrid.displayName = "DotGrid";
