import { cache } from "react";
import { categories } from "@/db/schema";
import { toResCategories } from "@/domain/categories";
import { drizzle } from "@/lib/client/drizzle";
import { CategoryWithCode, type Category } from "@/types/drizzle";

export const getCategories = cache(async (): Promise<Category[]> => {
  const result = await drizzle.select().from(categories);

  return result;
});

export const getCategoriesWithComponentsCount = cache(
  async (): Promise<CategoryWithCode[]> => {
    const result = await drizzle.query.categories.findMany({
      with: {
        components: {
          orderBy: (comments, { desc }) => [desc(comments.id)],
          with: {
            codes: true,
          },
          columns: {
            id: true,
          },
        },
      },
    });

    return toResCategories(result);
  }
);
