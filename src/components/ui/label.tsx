"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { Asterisk } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

type RequiredProps = React.ComponentProps<typeof Asterisk>;

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & {
      requiredProps?: RequiredProps;
      required?: boolean;
    }
>(({ className, required = false, requiredProps, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), required && "flex items-center", className)}
    {...props}
  >
    {required && (
      <Asterisk
        className={cn(
          "inline-block mr-1 w-3 h-3 text-red-500",
          requiredProps?.className
        )}
        {...requiredProps}
      />
    )}
    {children}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
