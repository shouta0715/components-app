import { Control, UseFormSetValue, useWatch } from "react-hook-form";

import { useFilesDropZone } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/drop-zone/files";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

export function usePreviewNavigation({
  controls,
  setValue,
}: {
  controls: Control<EditFilesInput>;
  setValue: UseFormSetValue<EditFilesInput>;
}) {
  const files = useWatch({
    control: controls,
    name: "files",
  });

  const { getInputProps, getRootProps, isDragActive } = useFilesDropZone({
    setValue,
    files,
  });

  const hasFiles = files.length > 0;

  return {
    hasFiles,
    files,
    isDragActive,
    getInputProps,
    getRootProps,
  };
}
