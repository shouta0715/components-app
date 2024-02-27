import { prisma } from "@/lib/client/prisma";
import { ComponentUpdateInput } from "@/lib/schema/server/component";
import { FilesUpdateInput } from "@/lib/schema/server/files";
import { deleteAWSFiles } from "@/services/files/delete";

export async function updateComponent(id: string, input: ComponentUpdateInput) {
  return prisma.component.update({
    where: { id },
    data: input,
    select: { id: true },
  });
}

export async function updateComponentFiles(
  id: string,
  input: FilesUpdateInput
) {
  const { deleteFiles, uploadFiles, functionName, draft } = input;

  const objectIds: string[] = [];
  const deleteIds: number[] = [];

  if (deleteFiles) {
    for (const { objectId, id: deleteID, extension } of deleteFiles) {
      objectIds.push(`${objectId}.${extension}`);
      deleteIds.push(deleteID);
    }
  }

  const uploadFilesData = uploadFiles?.map((file) => ({
    name: file.name,
    objectId: file.objectId,
    extension: file.extension,
  }));

  return prisma.$transaction(async (tp) => {
    const data = await tp.component.update({
      where: { id },
      select: { files: { select: { id: true, objectId: true } } },
      data: {
        files: {
          deleteMany: { id: { in: deleteIds } },
          createMany: {
            data: uploadFilesData ?? [],
          },
        },
        functionName,
        draft,
      },
    });

    if (objectIds.length === 0) return data;

    await deleteAWSFiles(objectIds);

    return data;
  });
}
