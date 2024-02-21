import { Category } from "@prisma/client";
import { CategoriesByHome } from "@/types/prisma";

type InputCategoriesByHome = {
  components: {
    id: string;
    previewUrl: string;
  }[];
  _count: {
    components: number;
  };
} & Category;

export function toResCategoriesByHome(
  input: InputCategoriesByHome[]
): CategoriesByHome[] {
  return input.map((category) => ({
    ...category,
    components: category.components[0],
  }));
}
