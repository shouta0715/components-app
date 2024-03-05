import dynamic from "next/dynamic";
import React from "react";
import { UseFormRegister } from "react-hook-form";

import { DocumentLoader } from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/components/client/loader";
import {
  EditDocumentInput,
  FormEditDocumentInput,
} from "@/lib/schema/client/edit/document";

type DocumentWriterProps = {
  register: UseFormRegister<FormEditDocumentInput>;
  defaultValues: EditDocumentInput;
};

const DynamicAutoSizeTextarea = dynamic(
  () => import("@/components/ui/textarea").then((mod) => mod.AutoSizeTextarea),
  {
    ssr: false,
    loading: () => (
      <DocumentLoader>ドキュメントを読み込んでいます...</DocumentLoader>
    ),
  }
);

export function DocumentWriter({
  register,
  defaultValues,
}: DocumentWriterProps) {
  return (
    <DynamicAutoSizeTextarea
      className="h-full overflow-hidden rounded-md bg-background/30 text-primary placeholder:pt-0.5 placeholder:text-sm"
      defaultValue={defaultValues}
      placeholder="ドキュメントを入力してください"
      {...register("document")}
    />
  );
}
