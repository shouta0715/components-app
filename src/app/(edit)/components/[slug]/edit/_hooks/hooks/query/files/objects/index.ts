import { File } from "@prisma/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  DefaultFileType,
  EditFilesInput,
  InputFileType,
} from "@/lib/schema/client/edit/files";
import { FileObject, getFiles } from "@/services/files/get";

type TransformFileObjectsProps = {
  slug: string;
  files: EditFilesInput["files"];
};

async function transformDefaultFiles(
  files: DefaultFileType[],
  slug: string
): Promise<FileObject[]> {
  const targetFiles: Omit<File, "id">[] = files.map((file) => ({
    objectId: file.objectId,
    extension: file.extension,
    componentId: slug,
  }));
  const defaultFiles = await getFiles(targetFiles);

  return defaultFiles;
}

async function transformInputFiles(
  files: InputFileType[],
  slug: string
): Promise<FileObject[]> {
  const fileValues = files.map(async (file) => {
    const content = await file.value.text();

    return {
      componentId: slug,
      file: content,
      extension: file.extension,
      id: file.objectId,
    };
  });

  const inputFiles = await Promise.all(fileValues);

  return inputFiles;
}

type PartitionedFiles = {
  defaultFiles: DefaultFileType[];
  inputFiles: InputFileType[];
};

async function transformFileObjects({
  slug,
  files,
}: TransformFileObjectsProps): Promise<FileObject[]> {
  const partitionedFiles: PartitionedFiles = {
    defaultFiles: [],
    inputFiles: [],
  };

  files.forEach((file) => {
    if (file.type === "default") {
      partitionedFiles.defaultFiles.push(file);
    } else {
      partitionedFiles.inputFiles.push(file);
    }
  });

  const fileObjects: FileObject[] = [];

  const { inputFiles, defaultFiles } = partitionedFiles;

  if (defaultFiles.length) {
    const transformed = await transformDefaultFiles(defaultFiles, slug);
    fileObjects.push(...transformed);
  }

  if (inputFiles.length) {
    const transformed = await transformInputFiles(inputFiles, slug);
    fileObjects.push(...transformed);
  }

  return fileObjects;
}

export function useQueryFileObjects({
  slug,
  files,
  setValue,
}: TransformFileObjectsProps & { setValue: UseFormSetValue<EditFilesInput> }) {
  const { data, isPending } = useSuspenseQuery({
    queryKey: ["fileObjects", { slug, files }],
    queryFn: () => transformFileObjects({ slug, files }),
  });

  function onDeleteFile(id: string) {
    const newFile = files.filter((file) => file.objectId !== id);

    setValue("files", newFile);
  }

  const canPreview = useMemo(() => {
    if (!files) return false;
    const is = files.find(
      (file) =>
        file.extension === "html" ||
        file.extension === "tsx" ||
        file.extension === "jsx"
    );

    return is;
  }, [files]);

  return { data, isPending, canPreview, onDeleteFile };
}
