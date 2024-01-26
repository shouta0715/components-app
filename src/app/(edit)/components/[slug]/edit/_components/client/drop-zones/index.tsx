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
} from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/drop-zone/preview";
import { accepts } from "@/app/(edit)/components/[slug]/edit/_hooks/utils/drop-zone";
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
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  children?: React.ReactNode;
};

function DropInputZone({
  isDragReject,
  isDragActive,
  isEmptyError,
  getInputProps,
  children,
}: DropInputZoneProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* children is Icons */}
      {children}

      {/* Input Zone */}
      <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
        <Label
          className="flex cursor-pointer items-center font-semibold text-primary hover:underline hover:underline-offset-4"
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
            {...getInputProps({
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
    </div>
  );
}

type PreviewDropZoneProps = {
  preview: string;
  defaultValue?: string;
};

function PreviewDropInputZone({ preview, defaultValue }: PreviewDropZoneProps) {
  const isDefault = preview === defaultValue;

  return (
    <div className="relative h-full w-full max-w-96 items-end justify-end sm:w-2/3">
      <div
        aria-hidden
        className="absolute z-10 h-full w-full [backgroundImage:linear-gradient(180deg,transparent_0_30%,hsl(var(--background))_85%_100%)]"
      />
      <Image
        alt={isDefault ? "default preview" : "preview"}
        className="rounded-lg from-transparent object-cover object-top "
        fill
        onLoad={() => {
          if (isDefault) return;

          URL.revokeObjectURL(preview);
        }}
        priority
        sizes="100%"
        src={isDefault ? getImageUrl(preview) : preview}
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
  ...option
}: DropzoneProps & {
  isError: boolean;
}) {
  const {
    isDragActive,
    isDragReject,
    previews,
    open,
    cropArea,
    setOpen,
    getInputProps,
    getRootProps,
    onCompleted,
    onCropCanceled,
  } = usePreviewDropZone({
    defaultValue,
    onDropAccepted,
    onDropRejected,
    ...option,
  });

  const isEmptyError = isError && !isDragActive;

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
          "flex justify-center rounded-lg border border-dashed border-border  pt-10 pb-5 px-4 sm:px-0 transition-colors relative h-96 duration-150 cursor-pointer",
          isDragActive && "border-primary border-2",
          isEmptyError &&
            "border-destructive border-2 hover:border-destructive",
          isDragReject && "border-destructive border-2 hover:border-destructive"
        )}
        role="button"
        {...getRootProps({
          accept: accepts.preview,
        })}
      >
        {previews.preview ? (
          <>
            <PreviewDropInputZone
              {...{ preview: previews.preview, defaultValue }}
            />
            <div className="absolute bottom-4 z-10 flex flex-col items-center justify-center">
              <DropInputZone
                {...{
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
