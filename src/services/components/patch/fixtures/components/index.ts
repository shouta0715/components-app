import { prisma } from "@/lib/client/prisma";

import { getFilesFixture } from "@/services/files/fixture";
import {
  defineCategoryFactory,
  defineComponentFactory,
  defineUserFactory,
} from "@/tests/fabbrica";

export async function createMockComponentFiles() {
  const user = defineUserFactory();
  const category = defineCategoryFactory();
  const mocFiles = getFilesFixture(3);

  const component = await defineComponentFactory({
    defaultData: {
      creator: user,
      category,
      files: {
        createMany: {
          data: mocFiles,
        },
      },
    },
  }).create();

  const files = await prisma.file.findMany({
    where: {
      componentId: component.id,
      objectId: { in: mocFiles.map((f) => f.objectId) },
    },
  });

  return { component, user, category, files };
}
