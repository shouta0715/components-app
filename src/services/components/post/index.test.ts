import { describe, expect, test } from "vitest";

import { createOtherCategory } from "@/services/category/get/mocks";
import { createDraftComponent } from "@/services/components/post";
import { defineUserFactory } from "@/tests/fabbrica";

describe("POST Component RDB test", () => {
  test("createDraftComponent", async () => {
    const user = await defineUserFactory().create();
    await createOtherCategory();

    const component = await createDraftComponent(user.id);

    expect(component).not.toBeUndefined();
    expect(component.name).toBe("");
    expect(component.draft).toBe(true);
    expect(component.previewUrl).toBe("");
    expect(component.categoryName).toBe("other");
    expect(component.creatorId).toBe(user.id);
    expect(component.document).toBe("");
  });

  describe("updateComponent", () => {
    test("update all fields", async () => {});
  });
});
