import { cache } from "react";
import { getEditComp } from "@/services/components/get";

export const cacheGetCompWithFiles = cache(async (id: string) => {
  return getEditComp(id);
});
