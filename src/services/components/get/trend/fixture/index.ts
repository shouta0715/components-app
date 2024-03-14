import { randomInt } from "crypto";
import {
  defineCategoryFactory,
  defineComponentFactory,
  defineFileFactory,
  defineLikeFactory,
  defineUserFactory,
} from "@/tests/fabbrica";

export const createMockTrendComponent = async ({
  draft = false,
}: {
  draft: boolean;
}) => {
  const categoryFactory = await defineCategoryFactory().create();
  const creatorFactory = defineUserFactory();
  const componentFactory = await defineComponentFactory({
    defaultData: async () => ({
      category: {
        connect: categoryFactory,
      },
      creator: creatorFactory,
      draft,
    }),
  }).createList(10);

  const files = await Promise.all(
    componentFactory.map(async (component) => {
      const factory = await defineFileFactory({
        defaultData: async () => ({
          component: {
            connect: {
              id: component.id,
            },
          },
        }),
      }).createList(1);

      return factory;
    })
  );

  const likes = await Promise.all(
    componentFactory.map(async (component) => {
      const factory = await defineLikeFactory({
        defaultData: async () => ({
          component: {
            connect: {
              id: component.id,
            },
          },
          user: creatorFactory,
        }),
      }).createList(randomInt(0, 10));

      return factory;
    })
  );

  return {
    componentFactory,
    categoryFactory,
    creatorFactory,
    files,
    likes,
  };
};
