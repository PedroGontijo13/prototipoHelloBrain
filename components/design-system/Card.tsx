"use client";

import * as React from "react";
import { cn } from "./cn";

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Heading rendered in bold Outfit. */
  title?: React.ReactNode;
  /** Icon shown in a circular chip that straddles the top border. */
  icon?: React.ReactNode;
  /** Featured cards get a pink hard-shadow instead of the neutral one. */
  featured?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, icon, featured = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-2xl border-2 border-foreground bg-card p-6 pt-8",
          "transition-all duration-300 ease-bounce",
          featured ? "shadow-pop-card-featured" : "shadow-pop-card",
          "hover:-rotate-1 hover:scale-[1.02]",
          className
        )}
        {...props}
      >
        {icon && (
          <span
            className={cn(
              "absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full",
              "border-2 border-foreground bg-tertiary text-foreground"
            )}
          >
            {icon}
          </span>
        )}
        {title && <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{title}</h3>}
        <div className="font-body text-foreground/80">{children}</div>
      </div>
    );
  }
);

Card.displayName = "Card";
