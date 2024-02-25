import React from "react";

import { useQueryTransformedCode } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/query/files/previews";
import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import { PreviewResizeGroup } from "@/components/elements/files/ui-preview/client/preview-resize-group";
import { CodeBundlerError } from "@/scripts/ui-preview/errors";
import { FileObject } from "@/services/files/get";

function EditFilePreviews({
  slug,
  objects,
  functionName,
}: {
  objects: FileObject[];
  slug: string;
  functionName?: string;
}) {
  const { data, isPending } = useQueryTransformedCode({
    objects,
    slug,
    functionName,
  });

  if (isPending) return <UIPreviewLoading name="edit" />;

  if (!data) throw new CodeBundlerError();

  return <PreviewResizeGroup data={data} name={slug} tittle={slug} />;
}

export default EditFilePreviews;
