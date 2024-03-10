import Link from "next/link";
import React from "react";
import { ComponentsOrder } from "@/app/(app)/(page)/categories/[name]/_features/common/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";

const orders: { name: ComponentsOrder; label: string }[] = [
  {
    name: "trend",
    label: "トレンド",
  },
  {
    name: "popular",
    label: "人気順",
  },
  {
    name: "new",
    label: "新着順",
  },
];
export function OrderButton({
  order,
  name,
}: {
  order: ComponentsOrder;
  name: string;
}) {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      {orders.map((o, i) => (
        <Link
          key={o.name}
          className={buttonVariants({
            size: "sm",
            variant: o.name === order ? "default" : "outline",
            className: cn(
              o.name === order
                ? "font-semibold pointer-events-none"
                : "text-muted-foreground",
              i === 0 && "rounded-r-none",
              i !== 0 && i !== orders.length - 1 && "rounded-none",
              i === orders.length - 1 && "rounded-l-none"
            ),
          })}
          href={{
            pathname: `/categories/${name}`,
            query: { order: o.name },
          }}
          replace
          type="button"
        >
          {o.label}
        </Link>
      ))}
    </span>
  );
}
