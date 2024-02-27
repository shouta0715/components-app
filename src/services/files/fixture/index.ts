import { File } from "@prisma/client";
import { randomExtension, randomString } from "@/utils/random";

export const getFilesFixture = (length: number = 3) => {
  const files: Omit<File, "id" | "componentId">[] = Array.from(
    { length },
    (_) => ({
      objectId: randomString(),
      extension: randomExtension(),
      name: randomString(),
    })
  );

  return files;
};
