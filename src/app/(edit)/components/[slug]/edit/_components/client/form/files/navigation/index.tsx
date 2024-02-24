import { FileUp, Siren, Video } from "lucide-react";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import { DropzoneInputProps } from "react-dropzone";
import { ErrorBoundary } from "react-error-boundary";
import { Control, FieldErrors, UseFormSetError } from "react-hook-form";
import { DropZoneInfo } from "@/app/(edit)/components/[slug]/edit/_components/client/form/files/drop-zone-info";
import { AcceptedFiles } from "@/app/(edit)/components/[slug]/edit/_components/client/form/files/files-info";
import { usePreviewNavigation } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/form/files/navigation";
import { useQueryFileObjects } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/query/files/objects";
import { accepts } from "@/app/(edit)/components/[slug]/edit/_hooks/utils/drop-zone";
import { UIPreviewError } from "@/components/elements/files/ui-preview/client/error";

import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import { Button } from "@/components/ui/button";
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
    loading: () => <UIPreviewLoading name="edit" />,
  }
);

type NavigationProps = {
  slug: string;
  files: EditFilesInput["files"];
  isLoading: boolean;
  isDragActive: boolean;
  onDeleteFile: (id: string) => void;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
};

function PreviewsNavigate({
  files,
  slug,
  isLoading,
  isDragActive,
  isAllSuccess,
  getInputProps,
  onDeleteFile,
}: NavigationProps & {
  isAllSuccess: boolean;
}) {
  const { data, hsaPreviewFiles } = useQueryFileObjects({
    slug,
    files,
  });

  const canPreview = hsaPreviewFiles && isAllSuccess;

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
            <Suspense fallback={<UIPreviewLoading name="edit" />}>
              <DynamicEditFilePreviews objects={data} slug={slug} />
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
              HTML, JSX,
              TSXのいずれかのファイルをアップロードすると、プレビューが表示されます。
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

function DropZoneNavigate({
  getInputProps,
  files,
  isLoading,
  isDragActive,
}: Omit<NavigationProps, "slug">) {
  return (
    <>
      <TabsContent value="preview">
        <DropZoneInfo
          files={files}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          isLoading={isLoading}
          type="preview"
        />
      </TabsContent>
      <TabsContent value="code">
        <DropZoneInfo
          files={files}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          isLoading={isLoading}
          type="code"
        />
      </TabsContent>
    </>
  );
}

function EditFileNavigate({
  controls,
  slug,
  isLoading,
  isAllSuccess,
  errors,
  setFiles,
  setError,
}: {
  controls: Control<EditFilesInput>;
  slug: string;
  isLoading: boolean;
  isAllSuccess: boolean;
  errors: FieldErrors<EditFilesInput>;
  setFiles: (files: EditFilesInput["files"]) => void;
  setError: UseFormSetError<EditFilesInput>;
}) {
  const {
    hasFiles,
    files,
    isDragActive,
    getRootProps,
    getInputProps,
    onDeleteFile,
    open,
  } = usePreviewNavigation({
    controls,
    setFiles,
    setError,
  });

  return (
    <div className="grid gap-4">
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
        <div
          {...getRootProps({
            disabled: isLoading,
            id: "files",
            type: "file",
            name: "files",
            accept: accepts.files,
            "aria-label": "Upload a file",
          })}
          className="flex flex-col gap-4"
        >
          {hasFiles ? (
            <Suspense
              fallback={<UIPreviewLoading className="mt-2" name="edit" />}
            >
              <PreviewsNavigate
                files={files}
                getInputProps={getInputProps}
                isAllSuccess={isAllSuccess}
                isDragActive={isDragActive}
                isLoading={isLoading}
                onDeleteFile={onDeleteFile}
                slug={slug}
              />
            </Suspense>
          ) : (
            <DropZoneNavigate
              files={files}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
              isLoading={isLoading}
              onDeleteFile={onDeleteFile}
            />
          )}
        </div>
      </NavigateTabs>
      {errors.files && (
        <p className="text-sm text-destructive">{errors.files.message}</p>
      )}
      <div>
        <Button
          className="font-semibold"
          onClick={open}
          size="sm"
          type="button"
        >
          ファイルを選択
        </Button>
        <div className="mt-4">
          <AcceptedFiles
            files={files}
            onDeleteFile={onDeleteFile}
            suffix="global-check-files"
          />
        </div>
      </div>
    </div>
  );
}

export default EditFileNavigate;
