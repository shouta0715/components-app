import clsx from "clsx";

import React from "react";
import { ActiveLink } from "@/components/ui/active-link";
import { buttonVariants } from "@/components/ui/button";
import { introDuctions, rankings } from "@/layouts/root/left/link-items";
import { getCategories } from "@/services/category/get";
import { cn } from "@/utils";

export function DesktopIntroDuction() {
  return (
    <nav className="grid gap-1">
      {introDuctions.map((introDuction) => (
        <ActiveLink
          key={introDuction.name}
          activeClass="active pointer-events-none font-semibold"
          className={cn(
            buttonVariants({
              variant: "link",
              size: "sm",
              radius: "default",
              className: "justify-start group px-0 flex text-muted-foreground ",
            })
          )}
          href={introDuction.href}
        >
          <div
            className={clsx(
              "mr-4 flex items-center justify-center rounded-md border border-border bg-background p-1",
              introDuction.boxClass
            )}
          >
            <introDuction.icon className={clsx("size-4", introDuction.color)} />
          </div>
          <span className={clsx(introDuction.textClass)}>
            {introDuction.name}
          </span>
        </ActiveLink>
      ))}
    </nav>
  );
}

export function DesktopRankings() {
  return (
    <nav className="grid gap-1">
      {rankings.map((ranking) => (
        <ActiveLink
          key={ranking.name}
          activeClass="active pointer-events-none font-semibold"
          className={cn(
            buttonVariants({
              variant: "link",
              size: "sm",
              radius: "default",
              className: "justify-start group px-0 flex text-muted-foreground ",
            })
          )}
          href={ranking.href}
        >
          <div className="mr-4 flex items-center justify-center rounded-md border bg-background p-1">
            <ranking.icon className="size-4 group-[.active]:text-primary" />
          </div>
          <span className="group-hover:text-primary group-hover:underline group-[.active]:text-primary group-[.active]:underline">
            {ranking.name}
          </span>
        </ActiveLink>
      ))}
    </nav>
  );
}

export async function DesktopCategories() {
  const categories = await getCategories(50);

  return (
    <nav>
      {categories.map((category) => (
        <ActiveLink
          key={category.name}
          activeClass="pointer-events-none font-semibold text-primary underline"
          className={cn(
            buttonVariants({
              variant: "link",
              size: "sm",
              radius: "default",
              className:
                "justify-start capitalize px-0 block text-muted-foreground ",
            })
          )}
          href={`/categories/${category.name}`}
        >
          {category.name}
        </ActiveLink>
      ))}
    </nav>
  );
}
