import { User } from "@prisma/client";

import { notFound } from "next/navigation";

import { prisma } from "@/lib/client/prisma";
import { NotFoundError } from "@/lib/errors";
import {
  CompWithFiles,
  CompWithImgs,
  ComponentWithParent,
  EditComp,
} from "@/types/prisma";

export const getComp = async (
  id: string,
  nextNotFound = true
): Promise<ComponentWithParent> => {
  const component = await prisma.component.findUnique({
    where: { id },
    include: {
      creator: {
        select: {
          name: true,
          image: true,
          id: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!component) {
    if (nextNotFound) notFound();

    throw new NotFoundError();
  }

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
    distinct: ["categoryName"],
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

export const getCompWithFiles = async (
  id: string,
  nextNotFound = true
): Promise<CompWithFiles> => {
  const component = await prisma.component.findUnique({
    where: { id },
    include: {
      files: true,
      creator: {
        select: {
          name: true,
          image: true,
          id: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!component) {
    if (nextNotFound) notFound();

    throw new NotFoundError();
  }

  return component;
};

export const getEditComp = async (id: string): Promise<EditComp> => {
  const component = await prisma.component.findUnique({
    where: { id },
    include: {
      files: true,
      previewImages: true,
      creator: {
        select: {
          id: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!component) notFound();

  return component;
};

export const getComponentCount = async (): Promise<number> => {
  return prisma.component.count();
};
