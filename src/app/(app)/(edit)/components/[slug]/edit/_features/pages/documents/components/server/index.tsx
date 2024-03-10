import React from "react";
import { EditDocumentForm } from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/documents/components/client";
import { EditDocumentInput } from "@/lib/schema/client/edit/document";

type EditDocumentProps = {
  defaultValues: EditDocumentInput;
  draft: boolean;
  name: string;
};

export function EditDocument(props: EditDocumentProps) {
  return (
    <div>
      <EditDocumentForm {...props} />
    </div>
  );
}
