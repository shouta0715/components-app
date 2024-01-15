import { Component } from "@prisma/client";
import { prisma } from "@/lib/client/prisma";

export async function createDraftComponent(userId: string): Promise<Component> {
  return prisma.component.create({
    data: {
      name: "Untitled Component",
      draft: true,
      previewUrl: "",
      categoryId: "other",
      creatorId: userId,
      document: "",
    },
  });
}
