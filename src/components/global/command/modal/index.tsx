"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SearchCategory } from "@/services/category/get/search";

export function CategoryCommandModal({
  categories,
}: {
  categories: SearchCategory[];
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        aria-label="Open command palette"
        className="grid h-8 w-8 place-items-center md:hidden"
        onClick={() => setOpen((o) => !o)}
        radius="full"
        size="icon"
        variant="ghost"
      >
        <Search className="h-5 w-5 md:h-6 md:w-6" />
      </Button>

      <button
        aria-label="Open command palette"
        className="relative hidden w-48  items-center justify-between rounded-lg bg-accent p-2 md:flex"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <Search className="absolute h-5 w-5 text-accent-foreground/50" />
        <span className="ml-7 text-sm text-accent-foreground/50">Search</span>

        <kbd className="pointer-events-none inline-flex select-none  gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground opacity-100 shadow-xl">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Categories">
            {categories.map((category) => (
              <CommandItem key={category.name} className="!p-0">
                <Link
                  className="flex h-full flex-1 justify-between px-1.5 py-3 font-normal capitalize"
                  href={`/categories/${category.name}`}
                  onClick={() => setOpen(false)}
                  prefetch={false}
                >
                  <span>{category.name}</span>
                  <span className="text-muted-foreground">
                    {category._count.components}種類
                  </span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>

        <div className="mt-6 ">
          <Link
            className={buttonVariants({
              className: "w-full",
            })}
            href="/categories"
            onClick={() => setOpen(false)}
          >
            もっと見る
          </Link>
        </div>
      </CommandDialog>
    </>
  );
}
