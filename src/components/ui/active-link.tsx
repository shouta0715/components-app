"use client";

import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";

export type ActiveLinkProps = Omit<
  VariantProps<typeof buttonVariants>,
  "variant"
> & {
  href: string;
  className?: string;
  activeClass?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export const ActiveLink = ({
  href,
  size,
  radius,
  className,
  activeClass,
  ...props
}: ActiveLinkProps) => {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      className={cn(
        buttonVariants({ variant: "link", size, className, radius }),
        active ? activeClass : ""
      )}
      href={href}
      {...props}
    />
  );
};
