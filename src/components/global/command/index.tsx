import "server-only";

import React from "react";
import { CategoryCommandModal } from "@/components/global/command/modal";
import { getCommandPaletteCategories } from "@/services/category/get";

export async function CommandPallet() {
  const categories = await getCommandPaletteCategories(10);

  return (
    <div className="flex items-center gap-x-2">
      <CategoryCommandModal categories={categories} />
    </div>
  );
}
