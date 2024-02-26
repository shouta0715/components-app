import { useAtomValue } from "jotai";
import React from "react";

import { useQueryTransformedCode } from "@/app/(edit)/components/[slug]/edit/_features/files/api/previews";
import { ChangeFunctionName } from "@/app/(edit)/components/[slug]/edit/_features/files/components/client/function-name-input/change-function-name";
import { isForceMountAtom } from "@/app/(edit)/components/[slug]/edit/_features/files/context";
import { FilePreviewsProps } from "@/app/(edit)/components/[slug]/edit/_features/files/types/file-preview";
import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import { PreviewResizeGroup } from "@/components/elements/files/ui-preview/client/preview-resize-group";
import { CodeBundlerError } from "@/scripts/ui-preview/errors";

function FilePreviews({ slug, objects, functionName }: FilePreviewsProps) {
  const forceMount = useAtomValue(isForceMountAtom);
  const { data, isPending } = useQueryTransformedCode({
    objects,
    slug,
    functionName,
  });

  if (forceMount) return <ChangeFunctionName />;
  if (isPending) return <UIPreviewLoading name="edit" />;

  if (!data) throw new CodeBundlerError();

  return <PreviewResizeGroup data={data} name={slug} tittle={slug} />;
}

export default FilePreviews;
