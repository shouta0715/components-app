import { prisma } from "@/lib/client/prisma";
import { getComponentCount } from "@/services/components/get/counts";
import {
  defineCategoryFactory,
  defineComponentFactory,
  defineUserFactory,
} from "@/tests/fabbrica";

describe("GET Component RDB Test / count", async () => {
  describe("getComponentCount", async () => {
    test("success", async () => {
      prisma.$transaction([
        prisma.$queryRaw`TRUNCATE TABLE "components" CASCADE`,
      ]);

      const category = defineCategoryFactory();
      const creator = defineUserFactory();
      await defineComponentFactory({
        defaultData: { category, creator },
      }).createList(3);

      const count = await getComponentCount();

      expect(count).toBe(3);
    });
  });
});
