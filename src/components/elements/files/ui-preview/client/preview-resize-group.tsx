import React from "react";

import { PreviewIframe } from "@/components/elements/files/ui-preview/client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { SuccessTransformedData } from "@/scripts/ui-preview/types";

export function PreviewResizeGroup({
  data,
  name,
  tittle,
}: {
  data: SuccessTransformedData;
  name: string;
  tittle: string;
}) {
  return (
    <ResizablePanelGroup className="px-2" direction="horizontal">
      <ResizablePanel className="min-w-64" defaultSize={100} minSize={30}>
        <PreviewIframe inputData={data} name={name} title={tittle} />
      </ResizablePanel>
      <ResizableHandle className="w-0" withHandle />
      <ResizablePanel defaultSize={0} />
    </ResizablePanelGroup>
  );
}
