import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
import { Control } from "react-hook-form";
import { FilesDropZone } from "@/app/(edit)/components/[slug]/edit/_components/client/files-drop-zone";
import { NoFileInfo } from "@/app/(edit)/components/[slug]/edit/_components/client/form/files/no-files-info";
import { usePreviewNavigation } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/form/files/navigation";
import { useQueryFileObjects } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/query/files/objects";
import { UIPreviewError } from "@/components/elements/files/ui-preview/client/error";

import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import {
  NavigateTabs,
  NavigateTabsTrigger,
  TabsContent,
  TabsList,
} from "@/components/ui/tabs";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

const DynamicEditFilePreviews = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_components/client/form/files/previews"
    ),
  {
    ssr: false,
    loading: () => <UIPreviewLoading name="edit" />,
  }
);

const DynamicMultipleBrightCode = dynamic(
  () =>
    import("@/components/elements/code/client/bright-code").then(
      (mod) => mod.MultipleBrightCode
    ),
  {
    ssr: false,
    loading: () => <UIPreviewLoading name="edit" />,
  }
);

function PreviewsNavigate({
  files,
  slug,
}: {
  slug: string;
  files: EditFilesInput["files"];
}) {
  const { data, canPreview } = useQueryFileObjects({
    slug,
    files,
  });

  return (
    <>
      <TabsContent value="preview">
        {canPreview ? (
          <ErrorBoundary FallbackComponent={UIPreviewError}>
            <Suspense fallback={null}>
              <DynamicEditFilePreviews objects={data} slug={slug} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <NoFileInfo type="preview" />
        )}
      </TabsContent>
      <TabsContent value="code">
        <DynamicMultipleBrightCode objects={data} />
      </TabsContent>
    </>
  );
}

function NoFilesNavigate() {
  return (
    <>
      <TabsContent value="preview">
        <NoFileInfo type="preview" />
      </TabsContent>
      <TabsContent value="code">
        <NoFileInfo type="code" />
      </TabsContent>
    </>
  );
}

function EditFileNavigate({
  controls,
  slug,
}: {
  controls: Control<EditFilesInput>;
  slug: string;
}) {
  const { hasFiles, files } = usePreviewNavigation({
    controls,
  });

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
      </TabsList>
      <FilesDropZone>
        {hasFiles ? (
          <Suspense>
            <PreviewsNavigate files={files} slug={slug} />
          </Suspense>
        ) : (
          <NoFilesNavigate />
        )}
      </FilesDropZone>
    </NavigateTabs>
  );
}

export default EditFileNavigate;
