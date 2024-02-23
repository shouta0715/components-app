import { FileUp } from "lucide-react";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import { DropzoneInputProps } from "react-dropzone";
import { ErrorBoundary } from "react-error-boundary";
import { Control, UseFormSetValue } from "react-hook-form";
import { NoFileInfo } from "@/app/(edit)/components/[slug]/edit/_components/client/form/files/no-files-info";
import { usePreviewNavigation } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/form/files/navigation";
import { useQueryFileObjects } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/query/files/objects";
import { accepts } from "@/app/(edit)/components/[slug]/edit/_hooks/utils/drop-zone";
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
    loading: () => <UIPreviewLoading className="px-0" name="edit" />,
  }
);

type NavigationProps = {
  slug: string;
  files: EditFilesInput["files"];
  isLoading: boolean;
  isDragActive: boolean;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
};

function PreviewsNavigate({
  files,
  slug,
  isLoading,
  isDragActive,
  getInputProps,
  setValue,
}: NavigationProps & { setValue: UseFormSetValue<EditFilesInput> }) {
  const { data, canPreview, onDeleteFile } = useQueryFileObjects({
    slug,
    files,
    setValue,
  });

  return (
    <>
      <TabsContent className="-mx-2" value="preview">
        {canPreview ? (
          <ErrorBoundary FallbackComponent={UIPreviewError}>
            <Suspense fallback={<UIPreviewLoading name="edit" />}>
              <DynamicEditFilePreviews objects={data} slug={slug} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <NoFileInfo
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
        <DynamicMultipleBrightCode
          objects={data}
          onClickDelete={onDeleteFile}
        />
      </TabsContent>
    </>
  );
}

function NoFilesNavigate({
  getInputProps,
  files,
  isLoading,
  isDragActive,
}: Omit<NavigationProps, "slug">) {
  return (
    <>
      <TabsContent value="preview">
        <NoFileInfo
          files={files}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          isLoading={isLoading}
          type="preview"
        />
      </TabsContent>
      <TabsContent value="code">
        <NoFileInfo
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
  setValue,
}: {
  controls: Control<EditFilesInput>;
  slug: string;
  isLoading: boolean;
  setValue: UseFormSetValue<EditFilesInput>;
}) {
  const { hasFiles, files, isDragActive, getRootProps, getInputProps } =
    usePreviewNavigation({
      controls,
      setValue,
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
            fallback={<UIPreviewLoading className="mt-2 px-0" name="edit" />}
          >
            <PreviewsNavigate
              files={files}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
              isLoading={isLoading}
              setValue={setValue}
              slug={slug}
            />
          </Suspense>
        ) : (
          <NoFilesNavigate
            files={files}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            isLoading={isLoading}
          />
        )}
      </div>
    </NavigateTabs>
  );
}

export default EditFileNavigate;
