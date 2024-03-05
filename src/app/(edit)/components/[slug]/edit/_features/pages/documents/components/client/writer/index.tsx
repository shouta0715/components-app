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
      className="h-full overflow-hidden rounded-md bg-background/30 text-primary placeholder:pt-0.5 placeholder:text-sm"
      defaultValue={defaultValues}
      placeholder="ドキュメントを入力してください"
      {...register("document")}
    />
  );
}
