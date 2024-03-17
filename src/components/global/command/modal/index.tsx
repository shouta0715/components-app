"use client";

import { Search } from "lucide-react";
import * as React from "react";

import { CategoryCommandModalContent } from "@/components/global/command/modal/content";
import { Button } from "@/components/ui/button";
import { CommandDialog } from "@/components/ui/command";
import { CommandPaletteCategory } from "@/services/category/get";

export function CategoryCommandModal({
  categories,
}: {
  categories: CommandPaletteCategory[];
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(categories[0].name);

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
      <CommandDialog
        commandProps={{
          value,
          onValueChange: setValue,
        }}
        contentClassName="max-w-3xl p-0 [&_[cmdk-group]]:px-0 [&_[cmdk-item]]:py-0  [&_[cmdk-item]]:px-0"
        onOpenChange={setOpen}
        open={open}
      >
        <CategoryCommandModalContent
          categories={categories}
          setOpen={setOpen}
          value={value}
        />
      </CommandDialog>
    </>
  );
}
