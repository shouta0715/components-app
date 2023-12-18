import { describe, expect, test } from "vitest";
import { createDraftComponent } from "@/services/components/post";
import { defineUserFactory } from "@/tests/fabbrica";

describe("POST Component RDB test", () => {
  test("createDraftComponent", async () => {
    const user = await defineUserFactory().create();

    const component = await createDraftComponent(user.id);

    expect(component).not.toBeUndefined();
    expect(component.name).toBe("Untitled Component");
    expect(component.draft).toBe(true);
    expect(component.previewUrl).toBe("");
    expect(component.categoryId).toBe("");
    expect(component.creatorId).toBe(user.id);
    expect(component.document).toBe("");
  });
});
