import React from "react";
import { useEditPreviews } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/form/files/previews";
import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import { PreviewResizeGroup } from "@/components/elements/files/ui-preview/client/preview-resize-group";
import { CodeBundlerError } from "@/scripts/ui-preview/errors";
import { FileObject } from "@/services/files/get";

function EditFilePreviews({
  slug,
  objects,
}: {
  objects: FileObject[];
  slug: string;
}) {
  const { data, isPending } = useEditPreviews({ objects, slug });

  if (isPending) return <UIPreviewLoading name="edit" />;

  if (!data) throw new CodeBundlerError();

  return <PreviewResizeGroup data={data} name={slug} tittle={slug} />;
}

export default EditFilePreviews;
