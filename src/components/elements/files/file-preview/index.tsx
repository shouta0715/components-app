import React, { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
import { MultipleBrightCode as ClientMultipleBrightCode } from "@/components/elements/code/client/bright-code";
import { MultipleBrightCode as ServerMultipleBrightCode } from "@/components/elements/code/server/bright-code";
import { UIPreview } from "@/components/elements/files/ui-preview";
import { UIPreviewError } from "@/components/elements/files/ui-preview/client/error";

import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import { MultipleCopyButton } from "@/components/ui/multiple-copy-button";
import {
  NavigateTabs,
  NavigateTabsTrigger,
  TabsContent,
  TabsList,
} from "@/components/ui/tabs";
import { transformCode } from "@/scripts/ui-preview";
import { FileObject } from "@/services/files/get";

export function FilePreviews({
  objects,
  name,
  CodeComponent,
}: {
  objects: FileObject[];
  name: string;
  CodeComponent:
    | typeof ClientMultipleBrightCode
    | typeof ServerMultipleBrightCode;
}) {
  const getData = transformCode(objects);

  return (
    <NavigateTabs className="grid gap-8" defaultValue="preview">
      <TabsList className="h-9 w-full justify-between rounded-none border-b bg-transparent p-0 dark:border-b-gray-700">
        <div>
          <NavigateTabsTrigger
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent transition-none data-[state=active]:border-b-primary"
            value="preview"
          >
            Preview
          </NavigateTabsTrigger>
          <NavigateTabsTrigger
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent transition-none data-[state=active]:border-b-primary"
            value="code"
          >
            Code
          </NavigateTabsTrigger>
        </div>
        <div className="relative">
          <MultipleCopyButton
            items={objects.map((object) => ({
              label: object.extension,
              value: object.file,
            }))}
          />
        </div>
      </TabsList>
      <TabsContent value="preview">
        <ErrorBoundary FallbackComponent={UIPreviewError}>
          <Suspense fallback={<UIPreviewLoading name={name} />}>
            <UIPreview
              getData={getData}
              name={name}
              tittle={objects[0].componentId}
            />
          </Suspense>
        </ErrorBoundary>
      </TabsContent>
      <TabsContent value="code">
        <CodeComponent objects={objects} />
      </TabsContent>
    </NavigateTabs>
  );
}
