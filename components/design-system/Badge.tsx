"use client";

import * as React from "react";
import { cn } from "./cn";

export type BadgeColor = "accent" | "secondary" | "tertiary" | "quaternary";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  /** Applies a slight tilt, e.g. for a "MOST POPULAR" callout. */
  rotate?: boolean;
}

const colorClasses: Record<BadgeColor, string> = {
  accent: "bg-accent text-accent-foreground",
  secondary: "bg-secondary text-white",
  tertiary: "bg-tertiary text-foreground",
  quaternary: "bg-quaternary text-white",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ color = "tertiary", rotate = false, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full border-2 border-foreground px-4 py-1",
        "font-heading text-xs font-bold uppercase tracking-wide shadow-pop",
        colorClasses[color],
        rotate && "-rotate-[12deg]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = "Badge";
