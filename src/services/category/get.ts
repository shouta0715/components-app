import { count, eq } from "drizzle-orm";
import { cache } from "react";
import { categories, components } from "@/db/schema";
import { drizzle } from "@/lib/client/drizzle";
import { CategoriesWithComponentsCount, type Category } from "@/types/drizzle";

export const getCategories = cache(async (): Promise<Category[]> => {
  const result = await drizzle.select().from(categories);

  return result;
});

export const getCategoriesWithComponentsCount = cache(
  async (): Promise<CategoriesWithComponentsCount[]> => {
    const result = await drizzle
      .select({
        categories,
        components: {
          count: count(components.id),
        },
      })
      .from(categories)
      .leftJoin(components, eq(categories.id, components.categoryId))
      .groupBy(categories.id);

    return result;
  }
);
