"use client";

import * as React from "react";
import { cn } from "./cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Visible id for the label; falls back to `name` or an auto id. */
  id?: string;
}

let autoId = 0;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, ...props }, ref) => {
    const inputId = React.useMemo(() => id ?? props.name ?? `input-${++autoId}`, [id, props.name]);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="font-body text-xs font-bold uppercase tracking-wide text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-12 rounded-md border-2 border-border bg-input px-4 font-body text-foreground",
            "shadow-[4px_4px_0px_0px_transparent] transition-all duration-200",
            "placeholder:text-muted-foreground",
            "focus:border-accent focus:shadow-pop-focus focus:outline-none",
            "disabled:opacity-50 disabled:pointer-events-none",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
