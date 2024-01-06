import React from "react";

import { PreviewIframe } from "@/components/elements/files/ui-preview/client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { transformCode } from "@/scripts/ui-preview";
import { CodeBundlerError } from "@/scripts/ui-preview/errors";
import { FileObject } from "@/services/files/get";

export async function UIPreview({
  objects,
  name,
}: {
  objects: FileObject[];
  name: string;
}) {
  const { data } = await transformCode(objects);

  if (!data) throw new CodeBundlerError();

  return (
    <ResizablePanelGroup className="px-2" direction="horizontal">
      <ResizablePanel className="min-w-64" defaultSize={100} minSize={30}>
        <PreviewIframe
          componentId={objects[0].componentId}
          inputData={data}
          name={name}
          title={objects[0].componentId}
        />
      </ResizablePanel>
      <ResizableHandle className="w-0" withHandle />

      <ResizablePanel defaultSize={0} />
    </ResizablePanelGroup>
  );
}
