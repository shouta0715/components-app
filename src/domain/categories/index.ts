import { Category } from "@prisma/client";
import { ViewCategory } from "@/types/prisma";

type InputPopularCategories = {
  components: {
    id: string;
    previewUrl: string;
  }[];
  _count: {
    components: number;
  };
} & Category;

export function toResPopularCategories(
  input: InputPopularCategories[]
): ViewCategory[] {
  return input.map((category) => ({
    ...category,
    components: category.components[0],
  }));
}
