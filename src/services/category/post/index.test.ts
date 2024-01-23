import { CategoryInput } from "@/lib/schema/server/category";
import { createCategory } from "@/services/category/post";
import { randomString } from "@/utils/random";

describe("POST Category RDB Test", async () => {
  test("createCategory", async () => {
    const name = randomString();
    const input: CategoryInput = {
      name,
      description: "test",
    };

    const should = await createCategory(input);

    expect(should).toEqual({
      name: input.name,
    });
  });
});
