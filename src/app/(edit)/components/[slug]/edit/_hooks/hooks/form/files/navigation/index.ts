import { Control, useWatch } from "react-hook-form";

import { useFilesDropZone } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/drop-zone/files";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

export function usePreviewNavigation({
  controls,
  setFiles,
}: {
  controls: Control<EditFilesInput>;
  setFiles: (files: EditFilesInput["files"]) => void;
}) {
  const files = useWatch({
    control: controls,
    name: "files",
  });

  function onDeleteFile(id: string) {
    const newFile = files.filter((file) => file.objectId !== id);

    setFiles(newFile);
  }

  const { getInputProps, getRootProps, isDragActive } = useFilesDropZone({
    setFiles,
    files,
  });

  const hasFiles = files.length > 0;

  return {
    hasFiles,
    files,
    isDragActive,
    getInputProps,
    getRootProps,
    onDeleteFile,
  };
}
