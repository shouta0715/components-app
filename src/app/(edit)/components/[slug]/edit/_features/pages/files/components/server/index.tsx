import React from "react";
import { EditFileForm } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/components/client";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

type EditFileProps = {
  defaultValues: EditFilesInput;
  draft: boolean;
  name: string;
};

export function EditFile(props: EditFileProps) {
  return (
    <div>
      <EditFileForm {...props} />
    </div>
  );
}
