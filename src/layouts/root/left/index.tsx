import React from "react";
import { ActiveLink } from "@/components/ui/active-link";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCategories } from "@/services/category/get";
import { cn } from "@/utils";

export async function LeftSide() {
  const categories = await getCategories();

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <p className="mb-3 font-semibold text-primary">Categories</p>
      <nav>
        {categories.map((category) => (
          <ActiveLink
            key={category.id}
            className={cn(
              buttonVariants({
                variant: "link",
                size: "sm",
                radius: "default",
                className: "justify-start px-0 block text-muted-foreground ",
              })
            )}
            href={`/categories/${category.id}`}
          >
            {category.name}
          </ActiveLink>
        ))}
      </nav>
    </ScrollArea>
  );
}
