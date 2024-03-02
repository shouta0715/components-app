import React from "react";
import { UseFormRegister } from "react-hook-form";

import { AutoSizeTextarea } from "@/components/ui/textarea";
import {
  EditDocumentInput,
  FormEditDocumentInput,
} from "@/lib/schema/client/edit/document";

type DocumentWriterProps = {
  register: UseFormRegister<FormEditDocumentInput>;
  defaultValues: EditDocumentInput;
};

export function DocumentWriter({
  register,
  defaultValues,
}: DocumentWriterProps) {
  return (
    <AutoSizeTextarea
      className="min-h-[50dvh] rounded-md border border-border p-6 text-sm text-primary placeholder:text-sm"
      defaultValue={defaultValues}
      placeholder="ドキュメントを入力してください"
      {...register("document")}
    />
  );
}
