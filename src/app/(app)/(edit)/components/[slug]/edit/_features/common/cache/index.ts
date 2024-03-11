import { cache } from "react";
import { getEditComponent } from "@/services/components/get/edit";

export const cacheGetEditComponent = cache(async (id: string) => {
  return getEditComponent(id);
});
