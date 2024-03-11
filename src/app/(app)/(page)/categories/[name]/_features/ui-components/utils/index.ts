import { ComponentsOrder } from "@/app/(app)/(page)/categories/[name]/_features/common/types";

export const getCategoryOrder = (order: string): ComponentsOrder => {
  if (order === "new") return "new";
  if (order === "popular") return "popular";

  return "trend";
};
