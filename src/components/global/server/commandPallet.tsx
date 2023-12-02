"server only";

import React from "react";
import { CategoryCommand } from "@/components/global/parts/category-command";
import { getCategories } from "@/services/category/get";

export async function CommandPallet() {
  const categories = await getCategories();

  return (
    <div className="flex items-center gap-x-2">
      <p className="hidden text-sm text-muted-foreground md:block">
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>

      <CategoryCommand categories={categories} />
    </div>
  );
}
