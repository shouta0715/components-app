"use client";

import React, { use } from "react";

import { PreviewIframe } from "@/components/elements/files/ui-preview/client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TransformedResult } from "@/scripts/ui-preview/types";

export function UIPreview({
  getData,
  name,
  tittle,
}: {
  getData: TransformedResult | Promise<TransformedResult>;
  name: string;
  tittle: string;
}) {
  const { data } = getData instanceof Promise ? use(getData) : getData;

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
