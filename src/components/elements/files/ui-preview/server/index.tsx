import React, { Suspense } from "react";

import { PreviewIframe } from "@/components/elements/files/ui-preview/client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";

import { transformCode } from "@/scripts/ui-preview";
import { CodeBundlerError } from "@/scripts/ui-preview/errors";
import { FileObject } from "@/services/files/get";

export async function UIPreview({ objects }: { objects: FileObject[] }) {
  const { data, error } = await transformCode(objects);

  if (error || !data) throw new CodeBundlerError();

  return (
    <ResizablePanelGroup className="px-2" direction="horizontal">
      <ResizablePanel className="min-w-64" defaultSize={100} minSize={30}>
        <Suspense
          fallback={<Skeleton className="h-96 w-full rounded-md border" />}
        >
          <PreviewIframe
            componentId={objects[0].componentId}
            inputData={data}
            title={objects[0].componentId}
          />
        </Suspense>
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={0} />
    </ResizablePanelGroup>
  );
}
