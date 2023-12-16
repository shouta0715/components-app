import { Component } from "@prisma/client";

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

export const getTopComps = async (take: number): Promise<CompWithImgs[]> => {
  const components = await prisma.component.findMany({
    take,
    include: {
      previewImages: {
        take: 1,
      },
    },
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
  });

  return components;
};
