import "server-only";

import React, { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
import { MultipleSyntaxCode } from "@/components/elements/code/server";
import { UIPreviewError } from "@/components/elements/files/ui-preview/client/error";
import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import { UIPreview } from "@/components/elements/files/ui-preview/server";

import { MultipleCopyButton } from "@/components/ui/multiple-copy-button";
import {
  NavigateTabs,
  NavigateTabsTrigger,
  TabsContent,
  TabsList,
} from "@/components/ui/tabs";
import { FileObject } from "@/services/files/get";

export async function FilePreviews({
  getObject,
  name,
  functionNames,
}: {
  getObject: () => Promise<FileObject[]>;
  name: string;
  functionNames?: string;
}) {
  const objects = await getObject();

  return (
    <NavigateTabs className="space-y-6" defaultValue="preview">
      <div className="flex items-center justify-between">
        <TabsList className="h-9 w-full justify-start rounded-none border-b bg-transparent p-0 dark:border-b-gray-700">
          <NavigateTabsTrigger
            aria-controls="preview"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent transition-none data-[state=active]:border-b-primary"
            role="tab"
            value="preview"
          >
            Preview
          </NavigateTabsTrigger>
          <NavigateTabsTrigger
            aria-controls="code"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent transition-none data-[state=active]:border-b-primary"
            role="tab"
            value="code"
          >
            Code
          </NavigateTabsTrigger>
        </TabsList>
        <div className="relative">
          <MultipleCopyButton
            items={objects.map((object) => ({
              label: object.extension,
              value: object.file,
            }))}
          />
        </div>
      </div>
      <TabsContent role="tabpanel" value="preview">
        <ErrorBoundary FallbackComponent={UIPreviewError}>
          <Suspense fallback={<UIPreviewLoading name={name} />}>
            <UIPreview
              functionName={functionNames}
              name={name}
              objects={objects}
            />
          </Suspense>
        </ErrorBoundary>
      </TabsContent>
      <TabsContent role="tabpanel" value="code">
        <MultipleSyntaxCode objects={objects} />
      </TabsContent>
    </NavigateTabs>
  );
}
