import { Category } from "@prisma/client";
import { cache } from "react";
import { prisma } from "@/lib/client/prisma";

export const getCategories = cache(async (): Promise<Category[]> => {
  const categories = await prisma.category.findMany();

  return categories;
});
