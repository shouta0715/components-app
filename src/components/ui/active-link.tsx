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
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export const ActiveLink = ({
  href,
  size,
  radius,
  className,
  ...props
}: ActiveLinkProps) => {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      className={cn(
        buttonVariants({ variant: "link", size, className, radius }),
        {
          "text-primary": active,
        }
      )}
      href={href}
      {...props}
    />
  );
};
