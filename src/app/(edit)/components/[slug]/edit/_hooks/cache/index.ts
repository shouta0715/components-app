import { cache } from "react";
import { getEditComp } from "@/services/components/get";

export const cacheGetCompWithFiles = cache((id: string) => {
  return getEditComp(id);
});
