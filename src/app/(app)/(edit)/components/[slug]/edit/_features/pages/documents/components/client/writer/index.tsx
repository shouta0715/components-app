import React from "react";
import {
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";

import { useMarkdownEditor } from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/documents/hooks/editor";
import {
  EditDocumentInput,
  FormEditDocumentInput,
} from "@/lib/schema/client/edit/document";

type DocumentWriterProps = {
  setValue: UseFormSetValue<FormEditDocumentInput>;
  reset: UseFormReset<FormEditDocumentInput>;
  getValues: UseFormGetValues<FormEditDocumentInput>;
  defaultValues: EditDocumentInput;
};

export const DocumentWriter = ({
  setValue,
  reset,
  getValues,
  defaultValues,
}: DocumentWriterProps) => {
  const { container } = useMarkdownEditor({
    defaultValues,
    setValue,
    reset,
    getValues,
  });

  return <div ref={container} />;
};
