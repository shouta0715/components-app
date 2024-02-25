import "server-only";

import React from "react";

import { PreviewResizeGroup } from "@/components/elements/files/ui-preview/client/preview-resize-group";
import { transformCode } from "@/scripts/ui-preview";
import { CodeBundlerError } from "@/scripts/ui-preview/errors";
import { FileObject } from "@/services/files/get";

export async function UIPreview({
  objects,
  name,
  functionName,
}: {
  objects: FileObject[];
  name: string;
  functionName?: string;
}) {
  const { data } = await transformCode(objects, functionName);

  if (!data) throw new CodeBundlerError();

  return <PreviewResizeGroup data={data} name={name} tittle={name} />;
}
