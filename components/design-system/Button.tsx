"use client";

import * as React from "react";
import { cn } from "./cn";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `primary` is the filled "candy" pill; `secondary` is outlined. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon rendered in a small circular chip at the trailing edge (primary only). */
  icon?: React.ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-12 px-6 text-sm gap-2",
  lg: "h-[52px] px-8 text-base gap-3",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", icon, className, children, ...props }, ref) => {
    const base = cn(
      "inline-flex items-center justify-center rounded-full font-heading font-bold",
      "border-2 border-foreground transition-all duration-300 ease-bounce",
      "focus-visible:outline-none focus-visible:shadow-pop-focus",
      "disabled:opacity-50 disabled:pointer-events-none",
      sizeClasses[size]
    );

    if (variant === "secondary") {
      return (
        <button
          ref={ref}
          className={cn(base, "bg-transparent text-foreground hover:bg-tertiary active:scale-[0.98]", className)}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          base,
          "bg-accent text-accent-foreground shadow-pop",
          "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover",
          "active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active",
          className
        )}
        {...props}
      >
        {children}
        {icon && (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-accent">
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
