import { CategoryWithCode, Category, Component } from "@/types/drizzle";

type Categories = (Category & {
  components: Pick<Component, "id">[];
})[];

export const toResCategories = (categories: Categories): CategoryWithCode[] => {
  return categories.map((category) => {
    const count = category.components.length;

    return {
      categories: {
        id: category.id,
        name: category.name,
        description: category.description,
      },
      components: category.components,
      aggregate: {
        count,
      },
    };
  });
};
