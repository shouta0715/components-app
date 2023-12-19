import { describe, expect, test } from "vitest";

import { defineCategoryFactory } from "../../../tests/fabbrica";
import { getCategories } from "@/services/category/get";

describe("Category RDB Test", async () => {
  test("getCategories", async () => {
    const categories = defineCategoryFactory();

    await categories.createList(10);

    const result = await getCategories(10);

    expect(result).toHaveLength(10);
  });
});
