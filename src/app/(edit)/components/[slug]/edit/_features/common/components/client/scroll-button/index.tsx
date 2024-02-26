"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type ScrollButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

export const ScrollButton = React.forwardRef<
  HTMLButtonElement,
  ScrollButtonProps
>(({ children, ...rest }, ref) => {
  return (
    <Button
      ref={ref}
      type="button"
      {...rest}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      {children}
    </Button>
  );
});
