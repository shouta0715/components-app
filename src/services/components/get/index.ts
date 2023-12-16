import { Component } from "@prisma/client";
import { cache } from "react";
import { prisma } from "@/lib/client/prisma";
import { CompWithImgs } from "@/types/prisma";

export const getComp = cache(async (id: string): Promise<Component | null> => {
  const component = await prisma.component.findUnique({
    where: { id },
  });

  return component;
});

export const getCompWithImgs = cache(
  async (id: string): Promise<CompWithImgs | null> => {
    const component = await prisma.component.findUnique({
      where: { id },
      include: {
        previewImages: true,
      },
    });

    return component;
  }
);

export const getTopComps = cache(
  async (take: number): Promise<CompWithImgs[]> => {
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
  }
);
