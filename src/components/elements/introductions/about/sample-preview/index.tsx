import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { MultipleSyntaxCode } from "@/components/elements/code/server";
import { UIPreviewError } from "@/components/elements/files/ui-preview/client/error";
import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import { UIPreview } from "@/components/elements/files/ui-preview/server";
import { sampleObject } from "@/components/elements/introductions/about/sample-preview/fixture";

import { MultipleCopyButton } from "@/components/ui/multiple-copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SamplePreviews() {
  return (
    <Tabs className="space-y-6" defaultValue="preview">
      <TabsList className="h-9 w-full justify-between rounded-none border-b bg-transparent p-0 dark:border-b-gray-700">
        <div>
          <TabsTrigger
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent transition-none data-[state=active]:border-b-primary"
            value="preview"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent transition-none data-[state=active]:border-b-primary"
            value="code"
          >
            Code
          </TabsTrigger>
        </div>
        <div className="relative">
          <MultipleCopyButton
            items={sampleObject.map((object) => ({
              label: object.extension,
              value: object.file,
            }))}
          />
        </div>
      </TabsList>
      <TabsContent value="preview">
        <ErrorBoundary FallbackComponent={UIPreviewError}>
          <Suspense fallback={<UIPreviewLoading name="Sample Preview" />}>
            <UIPreview
              functionName="Example"
              name="Sample Preview"
              objects={sampleObject}
            />
          </Suspense>
        </ErrorBoundary>
      </TabsContent>
      <TabsContent value="code">
        <MultipleSyntaxCode objects={sampleObject} />
      </TabsContent>
    </Tabs>
  );
}
