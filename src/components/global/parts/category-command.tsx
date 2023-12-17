"use client";

import { Category } from "@prisma/client";
import { CreditCard, Search, Settings, User } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export function CategoryCommand({ categories }: { categories: Category[] }) {
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
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Categories">
            {categories.map((category) => (
              <CommandItem key={category.id}>
                <span>{category.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
