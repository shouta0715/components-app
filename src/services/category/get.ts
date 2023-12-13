import { Category } from "@prisma/client";
import { cache } from "react";
import { prisma } from "@/lib/client/prisma";

export const getCategories = cache(async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();

  return result;
});
