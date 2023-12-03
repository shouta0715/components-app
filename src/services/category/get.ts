import { cache } from "react";
import { categories } from "@/db/schema";
import { drizzle } from "@/lib/client/drizzle";
import { type Category } from "@/types/drizzle";

export const getCategories = cache(async (): Promise<Category[]> => {
  const result = await drizzle.select().from(categories);

  return result;
});
