import { describe, expect, test } from "vitest";

import { getCategories } from "@/services/category/get";
import { defineCategoryFactory } from "@/tests/fabbrica";

describe("Category RDB Test", async () => {
  test("getCategories", async () => {
    const categories = defineCategoryFactory();

    await categories.createList(10);

    const result = await getCategories(10);

    expect(result).toHaveLength(10);
  });
});
