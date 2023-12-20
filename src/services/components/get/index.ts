import { Component, User } from "@prisma/client";

import { prisma } from "@/lib/client/prisma";
import { NotFoundError } from "@/lib/errors";
import { CompWithImgs } from "@/types/prisma";

export const getComp = async (id: string): Promise<Component | null> => {
  const component = await prisma.component.findUnique({
    where: { id },
  });

  if (!component) throw new NotFoundError();

  return component;
};

export const getCompWithImages = async (id: string): Promise<CompWithImgs> => {
  const component = await prisma.component.findUnique({
    where: { id },
    include: {
      previewImages: true,
    },
  });

  if (!component) throw new NotFoundError();

  return component;
};

export const getTopComps = async (
  take: number
): Promise<
  (CompWithImgs & {
    creator: User;
  })[]
> => {
  const components = await prisma.component.findMany({
    take,
    distinct: ["categoryId"],
    include: {
      previewImages: {
        take: 1,
      },
      creator: true,
    },
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
  });

  return components;
};

export const getComponentCount = async (): Promise<number> => {
  return prisma.component.count();
};
