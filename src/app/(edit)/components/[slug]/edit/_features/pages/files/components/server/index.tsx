import React from "react";
import { EditFileForm } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/components/client";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

export function EditFile({
  defaultValues,
  draft,
}: {
  defaultValues: EditFilesInput;
  draft: boolean;
}) {
  return (
    <div>
      <EditFileForm defaultValues={defaultValues} draft={draft} />
    </div>
  );
}
