/* eslint-disable no-nested-ternary */

"use client";

import clsx from "clsx";
import { AlertCircle, ImageIcon } from "lucide-react";
import React from "react";
import { DropzoneInputProps } from "react-dropzone";
import { Area } from "react-easy-crop";
import {
  DropzoneProps,
  usePreviewDropZone,
} from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/drop-zone/hooks/preview";
import { accepts } from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/drop-zone/utils";
import { PreviewDropZoneLoader } from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/loaders";
import { ImageCropper } from "@/components/elements/cropper";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Image } from "@/components/ui/image";
import { Label } from "@/components/ui/label";
import { cn, getImageUrl } from "@/utils";

type DropInputZoneProps = {
  isDragReject: boolean;
  isDragActive: boolean;
  isEmptyError: boolean;
  isLoading: boolean;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  children?: React.ReactNode;
};

function DropInputZone({
  isDragReject,
  isDragActive,
  isEmptyError,
  isLoading,
  getInputProps,
  children,
}: DropInputZoneProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* children is Icons */}
      {children}

      {/* Input Zone */}

      {!isLoading && (
        <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
          <Label
            aria-label="Upload a file"
            className={cn(
              "flex cursor-pointer items-center font-semibold text-primary hover:underline hover:underline-offset-4"
            )}
            htmlFor="preview"
          >
            <span
              className={clsx(
                (isDragReject || isEmptyError) &&
                  "font-normal text-muted-foreground transition-colors duration-150"
              )}
            >
              Upload a file
            </span>
            <input
              aria-disabled={isLoading}
              disabled={isLoading}
              {...getInputProps({
                disabled: isLoading,
                id: "preview",
                type: "file",
                name: "preview",
                accept: accepts.preview,
                "aria-label": "Upload a file",
              })}
            />
          </Label>
          <p className="pl-1">or drag and drop</p>
        </div>
      )}
      {isLoading ? (
        <p className="text-xs leading-5 text-muted-foreground">
          Uploading Preview Image...
        </p>
      ) : (
        <p
          className={cn(
            "text-xs leading-5 text-muted-foreground",
            isDragActive && "text-primary",
            isEmptyError && "text-destructive",
            isDragReject && "text-destructive"
          )}
        >
          {isDragReject ? (
            <span className="font-medium">File type not accepted</span>
          ) : (
            <span>PNG, JPG, GIF up to 10MB</span>
          )}
        </p>
      )}
    </div>
  );
}

type PreviewDropZoneProps = {
  preview: string;
  defaultValue?: string;
  isLoading: boolean;
};

function PreviewDropInputZone({
  preview,
  defaultValue,
  isLoading,
}: PreviewDropZoneProps) {
  const isDefault = preview === defaultValue;

  return (
    <div
      className={clsx(
        "relative h-full w-full max-w-96 items-end justify-end overflow-hidden sm:w-2/3",
        isLoading && "cursor-not-allowed opacity-50"
      )}
    >
      <div
        aria-hidden
        className="absolute z-10 h-full w-full [backgroundImage:linear-gradient(180deg,transparent_0_30%,hsl(var(--background))_85%_100%)]"
      />
      <Image
        alt={isDefault ? "default preview" : "preview"}
        className="absolute mx-auto h-auto w-auto rounded-lg from-transparent"
        height={200}
        onLoad={() => {
          if (isDefault) return;

          URL.revokeObjectURL(preview);
        }}
        src={isDefault ? getImageUrl(preview) : preview}
        width={400}
      />
    </div>
  );
}

function PreviewImageCropper({
  preview,
  onCompleted,
  onCropCanceled,
  open,
  setOpen,
  cropArea,
}: {
  open: boolean;
  setOpen: (flag: boolean) => void;
  preview: string | undefined;
  onCompleted: () => Promise<void>;
  onCropCanceled: () => void;
  cropArea: (area: Area) => void;
}) {
  return (
    <AlertDialog
      onOpenChange={(flag) => {
        setOpen(flag);
        if (!flag) onCropCanceled();
      }}
      open={open}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Crop Preview Image</AlertDialogTitle>
          <ImageCropper
            image={preview}
            onCropComplete={(_, area) => {
              cropArea(area);
            }}
          />
          <div className="flex justify-end gap-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onCompleted().then(() => {
                  setOpen(false);
                });
              }}
            >
              Crop
            </AlertDialogAction>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function PreviewDropZone({
  onDropAccepted,
  onDropRejected,
  defaultValue,
  isError,
  isLoading,
  previews,
  setPreviews,
  ...option
}: DropzoneProps & {
  isError: boolean;
}) {
  const {
    isDragActive,
    isDragReject,
    open,
    cropArea,
    setOpen,
    getInputProps,
    getRootProps,
    onCompleted,
    onCropCanceled,
  } = usePreviewDropZone({
    defaultValue,
    isLoading,
    onDropAccepted,
    onDropRejected,
    previews,
    setPreviews,
    ...option,
  });

  const isEmptyError = isError && !isDragActive;

  if (isLoading && !previews.preview) {
    return <PreviewDropZoneLoader text="Uploading Preview Image" />;
  }

  return (
    <>
      <PreviewImageCropper
        cropArea={(area) => {
          cropArea.current = area;
        }}
        onCompleted={onCompleted}
        onCropCanceled={onCropCanceled}
        open={open}
        preview={previews.crop}
        setOpen={setOpen}
      />

      <div
        className={cn(
          "flex justify-center rounded-lg border bg-background/30 border-dashed border-border  pt-10 pb-5 px-4 sm:px-0 transition-colors relative h-96 duration-150 cursor-pointer hover:border-primary hover:border-2",
          isDragActive && "border-primary border-2",
          isEmptyError &&
            "border-destructive border-2 hover:border-destructive",
          isDragReject &&
            "border-destructive border-2 hover:border-destructive",
          isLoading && "cursor-not-allowed"
        )}
        role="button"
        {...getRootProps({
          accept: accepts.preview,
          disabled: isLoading,
        })}
      >
        {previews.preview ? (
          <>
            <PreviewDropInputZone
              {...{ preview: previews.preview, defaultValue, isLoading }}
            />
            <div className="absolute bottom-4 z-10 flex flex-col items-center justify-center">
              <DropInputZone
                {...{
                  isLoading,
                  isEmptyError,
                  isDragReject,
                  isDragActive,
                  getInputProps,
                }}
              />
            </div>
          </>
        ) : (
          <DropInputZone
            {...{
              isLoading,
              isEmptyError,
              isDragReject,
              isDragActive,
              getInputProps,
            }}
          >
            {isDragReject || isEmptyError ? (
              <AlertCircle
                aria-hidden="true"
                className="mx-auto h-12 w-12 text-destructive"
              />
            ) : (
              <ImageIcon
                aria-hidden="true"
                className={cn(
                  "mx-auto h-12 w-12 text-gray-300 transition-colors duration-150 dark:text-gray-400",
                  isDragActive && "text-primary dark:text-primary"
                )}
              />
            )}
          </DropInputZone>
        )}
      </div>
    </>
  );
}
