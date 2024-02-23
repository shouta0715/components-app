import React from "react";
import { EditFileForm } from "@/app/(edit)/components/[slug]/edit/_components/client/form/files";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

export function EditFile({ defaultValues }: { defaultValues: EditFilesInput }) {
  return (
    <div>
      <EditFileForm defaultValues={defaultValues} />
    </div>
  );
}
