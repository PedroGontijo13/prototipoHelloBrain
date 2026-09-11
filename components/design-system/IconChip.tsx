"use client";

import * as React from "react";
import { cn } from "./cn";

export type IconChipColor = "accent" | "secondary" | "tertiary" | "quaternary" | "foreground";

export interface IconChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: React.ReactNode;
  color?: IconChipColor;
  size?: "sm" | "md";
  /** Plays the wiggle keyframe on hover, per the icon-enclosure convention. */
  wiggle?: boolean;
}

const colorClasses: Record<IconChipColor, string> = {
  accent: "bg-accent text-accent-foreground",
  secondary: "bg-secondary text-white",
  tertiary: "bg-tertiary text-foreground",
  quaternary: "bg-quaternary text-white",
  foreground: "bg-foreground text-background",
};

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
};

export const IconChip = React.forwardRef<HTMLSpanElement, IconChipProps>(
  ({ icon, color = "accent", size = "md", wiggle = false, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        colorClasses[color],
        sizeClasses[size],
        wiggle && "hover:animate-wiggle",
        className
      )}
      {...props}
    >
      {icon}
    </span>
  )
);

IconChip.displayName = "IconChip";
