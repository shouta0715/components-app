import { Code2, Eye } from "lucide-react";
import React, { Suspense } from "react";

import { Control, FieldErrors, UseFormSetError } from "react-hook-form";
import { AcceptedFiles } from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/drop-zone/components/client/files-drop-zones";
import { accepts } from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/drop-zone/utils";
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
    <div className="space-y-4">
      <NavigateTabs defaultValue="preview">
        <TabsList className="block h-9 w-full space-x-4 rounded-none border-b border-border bg-transparent p-0">
          <NavigateTabsTrigger
            className="h-9 rounded-none border-b-2 border-b-transparent bg-transparent transition-none hover:text-primary data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
            value="preview"
          >
            <Eye className="mr-2 size-5" />
            Preview
          </NavigateTabsTrigger>
          <NavigateTabsTrigger
            className="h-9 rounded-none border-b-2 border-b-transparent bg-transparent transition-none hover:text-primary data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
            value="code"
          >
            <Code2 className="mr-2 size-5" />
            Code
          </NavigateTabsTrigger>
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
          className="mt-6"
        >
          {hasFiles ? (
            <Suspense fallback={<UIPreviewLoading name="Loading..." />}>
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
