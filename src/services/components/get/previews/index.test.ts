import { getPreviewComponent } from "@/services/components/get/previews";
import {
  defineCategoryFactory,
  defineComponentFactory,
  defineFileFactory,
  defineUserFactory,
} from "@/tests/fabbrica";

describe("GET Component RDB Test / previews", async () => {
  describe("getPreviewComponent", async () => {
    test("success", async () => {
      const category = defineCategoryFactory();
      const creator = defineUserFactory();
      const mockComponent = await defineComponentFactory({
        defaultData: { category, creator },
      }).create();
      const mockFile = defineFileFactory({
        defaultData: async () => ({
          component: {
            connect: {
              id: mockComponent.id,
            },
          },
        }),
      });

      await mockFile.createList(3);

      const should = await getPreviewComponent(mockComponent.id);

      expect(should).toStrictEqual(should);
    });
  });
});
