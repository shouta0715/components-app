import { FileUp, Siren, Video } from "lucide-react";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { DropZoneInfo } from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/drop-zone/components/client/files-drop-zones";
import { useQueryFileObjects } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/api/objects";
import { NavigationProps } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/types/navigation/preview";
import { UIPreviewError } from "@/components/elements/files/ui-preview/client/error";

import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import { TabsContent } from "@/components/ui/tabs";

const DynamicEditFilePreviews = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_features/pages/files/components/client/previews"
    ),
  {
    ssr: false,
    loading: () => <UIPreviewLoading name="Loading..." />,
  }
);

const DynamicMultipleBrightCode = dynamic(
  () =>
    import("@/components/elements/code/client/bright-code").then(
      (mod) => mod.MultipleBrightCode
    ),
  {
    loading: () => <UIPreviewLoading name="Loading..." />,
  }
);

type PreviewNavigationProps = {
  isAllSuccess: boolean;
} & NavigationProps;

export function PreviewsNavigate({
  files,
  slug,
  isLoading,
  isDragActive,
  isAllSuccess,
  functionName,
  getInputProps,
  onDeleteFile,
}: PreviewNavigationProps) {
  const { data, hasPreviewFiles } = useQueryFileObjects({
    slug,
    files,
  });

  const canPreview = hasPreviewFiles && isAllSuccess;

  return (
    <>
      {canPreview && (
        <p className="-mb-3 flex items-center gap-x-2 px-2 text-xs leading-5 text-primary">
          <Video className="size-6" />
          プレビューを表示中
        </p>
      )}
      <TabsContent value="preview">
        {canPreview ? (
          <ErrorBoundary FallbackComponent={UIPreviewError}>
            <Suspense fallback={<UIPreviewLoading name="Loading..." />}>
              <DynamicEditFilePreviews
                functionName={functionName}
                objects={data}
                slug={slug}
              />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <DropZoneInfo
            files={files}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            isLoading={isLoading}
            type="preview"
          />
        )}
      </TabsContent>
      <TabsContent className="relative" value="code">
        {isDragActive && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-lg bg-white/30 font-semibold text-white">
            <FileUp aria-hidden="true" className="size-16" />
            <span className="text-lg">Drag and drop your files here</span>
          </div>
        )}
        {!canPreview && (
          <p className="mb-3 flex gap-x-2 text-xs  font-medium leading-5 text-primary">
            <Siren className="size-6 text-destructive" />
            <span className="self-end">
              ステータスをすべて満たすとプレビューが表示されます
            </span>
          </p>
        )}
        <DynamicMultipleBrightCode
          objects={data}
          onClickDelete={onDeleteFile}
        />
      </TabsContent>
    </>
  );
}
