import { Control, UseFormSetError, useWatch } from "react-hook-form";

import { useFilesDropZone } from "@/app/(app)/(edit)/components/[slug]/edit/_features/common/components/client/drop-zone/hooks/files";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

export function usePreviewNavigation({
  controls,
  setFiles,
  setError,
}: {
  controls: Control<EditFilesInput>;
  setFiles: (files: EditFilesInput["files"]) => void;
  setError: UseFormSetError<EditFilesInput>;
}) {
  const [files, functionName, type] = useWatch({
    control: controls,
    name: ["files", "previewType.functionName", "previewType.type"],
  });

  function onDeleteFile(id: string) {
    const newFile = files.filter((file) => file.objectId !== id);

    setFiles(newFile);
  }

  const { open, getInputProps, getRootProps, isDragActive } = useFilesDropZone({
    setFiles,
    setError,
    files,
  });

  const hasFiles = files.length > 0;

  return {
    hasFiles,
    files,
    isDragActive,
    functionName,
    type,
    getInputProps,
    getRootProps,
    onDeleteFile,
    open,
  };
}
