import { getTrendComponents } from "@/services/components/get/trend";
import { createMockTrendComponent } from "@/services/components/get/trend/fixture";

describe("GET Component RDB Test / trend", async () => {
  describe("getTrendComponents", async () => {
    test("draft = false get", async () => {
      const { categoryFactory } = await createMockTrendComponent({
        draft: true,
      });

      const components = await getTrendComponents({
        limit: 10,
        offset: 0,
        categoryName: categoryFactory.name,
      });

      expect(components.length).toBe(0);
    });

    test("draft = true not get", async () => {
      const { categoryFactory } = await createMockTrendComponent({
        draft: false,
      });

      const components = await getTrendComponents({
        limit: 10,
        offset: 0,
        categoryName: categoryFactory.name,
      });

      expect(components.length).toBe(10);

      components.forEach((component, i) => {
        if (i === 0) return;

        const prevComponent = components[i - 1];

        const prevWeight = Number(prevComponent.weight);
        const weight = Number(component.weight);

        expect(weight).toBeLessThanOrEqual(prevWeight);
      });
    });
  });
});
