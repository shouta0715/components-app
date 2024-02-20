import { describe, expect, test } from "vitest";

import { prisma } from "@/lib/client/prisma";
import { ComponentUpdateInput } from "@/lib/schema/server/component";
import { updateComponent } from "@/services/components/patch";
import { createDraftComponent } from "@/services/components/post";
import { defineUserFactory } from "@/tests/fabbrica";

describe("PATCH Component RDB test", () => {
  test("update all fields", async () => {
    const user = await defineUserFactory().create();

    const component = await createDraftComponent(user.id);

    const newData: ComponentUpdateInput = {
      name: "new name",
      description: "new description",
      previewUrl: "new previewUrl",
      draft: false,
      categoryName: "new category",
      document: "new document",
    };

    await updateComponent(component.id, newData);

    const expectComponent = await prisma.component.findUnique({
      where: { id: component.id },
    });

    if (!expectComponent) throw new Error("Component not found");

    expect(expectComponent).not.toBeUndefined();
    expect(expectComponent.name).toBe(newData.name);
    expect(expectComponent.description).toBe(newData.description);
    expect(expectComponent.previewUrl).toBe(newData.previewUrl);
    expect(expectComponent.draft).toBe(newData.draft);
    expect(expectComponent.categoryName).toBe(newData.categoryName);
    expect(expectComponent.document).toBe(newData.document);
  });

  test("update some fields", async () => {
    const user = await defineUserFactory().create();

    const component = await createDraftComponent(user.id);

    const newData: ComponentUpdateInput = {
      name: "new name",
      description: "new description",
    };

    const updatedComponent = await updateComponent(component.id, newData);

    expect(updatedComponent).not.toBeUndefined();

    const expectComponent = await prisma.component.findUnique({
      where: { id: component.id },
    });

    if (!expectComponent) throw new Error("Component not found");

    expect(expectComponent).not.toBeUndefined();
    expect(expectComponent.name).toBe(newData.name);
    expect(expectComponent.description).toBe(newData.description);

    expect(expectComponent.previewUrl).toBe(component.previewUrl);
    expect(expectComponent.draft).toBe(component.draft);
    expect(expectComponent.categoryName).toBe(component.categoryName);
    expect(expectComponent.document).toBe(component.document);
  });
});
