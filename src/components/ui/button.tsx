"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariantProps } from "@/components/ui/button-variants";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & ButtonVariantProps
>(function Button({ className, variant = "default", size = "default", type = "button", ...props }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
});

export { Button, buttonVariants };
