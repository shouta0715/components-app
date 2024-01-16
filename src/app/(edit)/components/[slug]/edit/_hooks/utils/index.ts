import { EditComp } from "@/types/prisma";

export const getComponentCreatedStatus = (
  data: Pick<EditComp, "name" | "files" | "document">
): {
  summaryCreated: boolean;
  filesCreated: boolean;
  documentCreated: boolean;
} => {
  const { name, files, document } = data;
  const summaryCreated = !!name && name !== "Untitled Component";

  return {
    summaryCreated,
    filesCreated: files.length !== 0,
    documentCreated: !!document,
  };
};
