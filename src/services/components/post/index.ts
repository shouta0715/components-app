import { Component } from "@prisma/client";
import { prisma } from "@/lib/client/prisma";

type InitialValues = {
  name: string;
  categoryName: string;
};

export async function createDraftComponent(
  userId: string,
  initialValues?: Partial<InitialValues>
): Promise<Component> {
  return prisma.component.create({
    data: {
      name: "",
      draft: true,
      previewUrl: "",
      categoryName: "other",
      creatorId: userId,
      document: "",
      ...initialValues,
    },
  });
}
