"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/utils";

interface StickyTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  stickyClassName?: string;
  margin?: number;
}

export function StickyTrigger({
  children,
  className,
  stickyClassName,
  margin = 0,
  ...rest
}: StickyTriggerProps) {
  const [isSticky, setIsSticky] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return () => {};
    const height = window.getComputedStyle(ref.current);
    const replaced = height.top.replace("px", "");
    if (Number.isNaN(+replaced)) return () => {};

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();

      setIsSticky(rect.top <= +replaced + margin);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [margin]);

  return (
    <div
      ref={ref}
      className={cn("sticky top-0", className, isSticky ? stickyClassName : "")}
      {...rest}
    >
      {children}
    </div>
  );
}
