import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, helperText, ...props }, ref) => (
    <div className="w-full">
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-2 bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          error 
            ? "border-destructive focus-visible:ring-destructive/50" 
            : "border-input hover:border-primary/50 focus-visible:border-primary",
          className
        )}
        ref={ref}
        {...props}
      />
      {helperText && (
        <p className={cn(
          "mt-2 text-sm",
          error ? "text-destructive font-medium" : "text-muted-foreground"
        )}>
          {helperText}
        </p>
      )}
    </div>
  ),
)
Input.displayName = "Input"

export { Input };