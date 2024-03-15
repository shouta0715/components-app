import "server-only";

import React from "react";
import { CategoryCommandModal } from "@/components/global/command/modal";
import { searchCategories } from "@/services/category/get/search";

export async function CommandPallet() {
  const categories = await searchCategories(null, 20);

  return (
    <div className="flex items-center gap-x-2">
      <CategoryCommandModal categories={categories} />
    </div>
  );
}
