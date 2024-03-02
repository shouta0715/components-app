import React, { Suspense } from "react";

import { Control, FieldErrors, UseFormSetError } from "react-hook-form";
import { AcceptedFiles } from "@/app/(edit)/components/[slug]/edit/_features/drop-zone/components/client/files-drop-zones";
import { accepts } from "@/app/(edit)/components/[slug]/edit/_features/drop-zone/utils";
import { DropZoneNavigate } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/components/client/navigation/drop-zone";
import { PreviewsNavigate } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/components/client/navigation/preview";
import { usePreviewNavigation } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/hooks/navigation";

import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import {
  NavigateTabs,
  NavigateTabsTrigger,
  TabsList,
} from "@/components/ui/tabs";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

type EditFileNavigateProps = {
  controls: Control<EditFilesInput>;
  slug: string;
  isLoading: boolean;
  isAllSuccess: boolean;
  errors: FieldErrors<EditFilesInput>;
  setFiles: (files: EditFilesInput["files"]) => void;
  setError: UseFormSetError<EditFilesInput>;
};

function EditFileNavigate({
  controls,
  slug,
  isLoading,
  isAllSuccess,
  errors,
  setFiles,
  setError,
}: EditFileNavigateProps) {
  const {
    hasFiles,
    files,
    isDragActive,
    functionName,
    type,
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
              fallback={<UIPreviewLoading className="mt-2" name="Loading..." />}
            >
              <PreviewsNavigate
                files={files}
                functionName={
                  type === "react" && functionName ? functionName : undefined
                }
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

      <div className="flex items-center gap-x-4">
        <Button
          className="font-semibold"
          onClick={open}
          size="sm"
          type="button"
        >
          ファイルを選択
        </Button>
        {errors.files && <ErrorMessage>{errors.files.message}</ErrorMessage>}
      </div>

      <div className="mt-4">
        <AcceptedFiles
          files={files}
          onDeleteFile={onDeleteFile}
          suffix="global-check-files"
        />
      </div>
    </div>
  );
}

export default EditFileNavigate;
