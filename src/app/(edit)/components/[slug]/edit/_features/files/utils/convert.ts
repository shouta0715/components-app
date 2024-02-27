import { DeepPartial } from "react-hook-form";
import { FilesUploaderProps } from "@/app/(edit)/components/[slug]/edit/_features/files/api/files";
import {
  DefaultFileType,
  EditFilesInput,
} from "@/lib/schema/client/edit/files";
import { DeleteFilesInput, UploadFileInput } from "@/lib/schema/server/files";

type GetDeleteFilesProps = {
  defaultFiles?: Readonly<DeepPartial<EditFilesInput["files"]>>;
  defaultTypeFiles: DefaultFileType[];
};

export function getDeleteFiles({
  defaultFiles,
  defaultTypeFiles,
}: GetDeleteFilesProps) {
  if (!defaultFiles) return [];

  const deleteFiles: DeleteFilesInput[] = [];

  for (const file of defaultFiles) {
    if (!file) continue;
    if (file.type !== "default") continue;

    const hasFile = defaultTypeFiles.some((f) => f.objectId === file.objectId);

    if (hasFile) continue;

    const { objectId, extension, id } = file;

    if (!id || !objectId || !extension) continue;

    deleteFiles.push({ objectId, extension, id });
  }

  return deleteFiles;
}

type ConvertFilesProps = {
  files: EditFilesInput["files"];
} & Pick<GetDeleteFilesProps, "defaultFiles">;

export function convertFiles({ files, defaultFiles }: ConvertFilesProps) {
  const uploadData: FilesUploaderProps = [];
  const defaultTypeFiles: DefaultFileType[] = [];

  for (const file of files) {
    if (file.type === "default") {
      defaultTypeFiles.push(file);
      continue;
    }
    const { value, objectId, extension, name } = file;
    uploadData.push({ file: value, extension, id: objectId, name });
  }

  const deleteFiles = getDeleteFiles({ defaultFiles, defaultTypeFiles });

  return { uploadData, defaultTypeFiles, deleteFiles };
}

type GetResetDefaultFilesProps = {
  uploadFiles: UploadFileInput[];
  ids: { [key: string]: number };
  defaultTypeFiles: DefaultFileType[];
};

export const getResetDefaultFiles = ({
  uploadFiles,
  ids,
  defaultTypeFiles,
}: GetResetDefaultFilesProps): DefaultFileType[] => {
  const resetUploadFiles: DefaultFileType[] = uploadFiles.map((file) => ({
    type: "default",
    objectId: file.objectId,
    extension: file.extension,
    name: file.name,
    id: ids[file.objectId],
  }));

  return [...defaultTypeFiles, ...resetUploadFiles];
};
