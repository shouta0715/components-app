import { Slot } from "@radix-ui/react-slot";
import React from "react";
import { cn } from "@/utils";

type Props = React.ComponentPropsWithoutRef<"p"> & {
  asChild?: boolean;
};

export const ErrorMessage = React.forwardRef<HTMLParagraphElement, Props>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";

    return (
      <Comp
        {...props}
        ref={ref}
        aria-live="off"
        className={cn("text-sm text-red-500", className)}
        role="alert"
      />
    );
  }
);
