"use client";

import * as React from "react";
import { cn } from "./cn";

export type SquiggleColor = "accent" | "secondary" | "tertiary" | "quaternary" | "foreground";

export interface SquiggleProps extends React.SVGAttributes<SVGSVGElement> {
  color?: SquiggleColor;
}

const strokeClasses: Record<SquiggleColor, string> = {
  accent: "stroke-accent",
  secondary: "stroke-secondary",
  tertiary: "stroke-tertiary",
  quaternary: "stroke-quaternary",
  foreground: "stroke-foreground",
};

/** A horizontal squiggle divider, e.g. underlining a heading or separating sections. */
export const Squiggle = React.forwardRef<SVGSVGElement, SquiggleProps>(({ color = "accent", className, ...props }, ref) => (
  <svg
    ref={ref}
    viewBox="0 0 120 12"
    fill="none"
    aria-hidden="true"
    className={cn("h-3 w-32", strokeClasses[color], className)}
    {...props}
  >
    <path
      d="M2 6C10 -1 18 13 26 6C34 -1 42 13 50 6C58 -1 66 13 74 6C82 -1 90 13 98 6C106 -1 114 13 118 6"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
));

Squiggle.displayName = "Squiggle";
