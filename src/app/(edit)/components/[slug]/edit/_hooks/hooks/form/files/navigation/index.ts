import { Control, useWatch } from "react-hook-form";

import { EditFilesInput } from "@/lib/schema/client/edit/files";

export function usePreviewNavigation({
  controls,
}: {
  controls: Control<EditFilesInput>;
}) {
  const files = useWatch({
    control: controls,
    name: "files",
  });

  const hasFiles = files.length > 0;

  return {
    hasFiles,
    files,
  };
}
