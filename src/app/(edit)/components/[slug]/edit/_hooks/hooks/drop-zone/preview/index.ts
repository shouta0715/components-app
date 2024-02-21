import React, { useRef } from "react";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import { Area } from "react-easy-crop";
import { toast } from "sonner";
import { typeToAccept } from "@/app/(edit)/components/[slug]/edit/_hooks/utils/drop-zone";
import { getCroppedImg } from "@/components/elements/cropper/cropper-trimming";

export type DropzoneProps = {
  onDropAccepted: (files: File) => void;
  onDropRejected: (files: FileRejection[]) => void;
  defaultValue?: string;
  isLoading: boolean;
  previews: Previews;
  setPreviews: React.Dispatch<React.SetStateAction<Previews>>;
} & Omit<
  DropzoneOptions,
  "onDropAccepted" | "accept" | "maxFiles" | "maxSize" | "onDropRejected"
>;

type Previews = {
  preview?: string;
  crop?: string;
};

function useCropper({
  onDropAccepted,
  setPreviews,
}: {
  onDropAccepted: (files: File) => void;
  setPreviews: React.Dispatch<React.SetStateAction<Previews>>;
  previews: Previews;
}) {
  const [open, setOpen] = React.useState(false);

  const cropArea = React.useRef<Area>();

  // Crop Function
  const onCropCompleted = React.useCallback(
    (url: string, file: File) => {
      setPreviews((ps) => ({
        ...ps,
        preview: url,
      }));

      onDropAccepted(file);
    },
    [onDropAccepted, setPreviews]
  );

  const onCropCanceled = React.useCallback(() => {
    setPreviews((ps) => {
      const { crop } = ps;

      if (crop) URL.revokeObjectURL(crop);

      return {
        ...ps,
        crop: undefined,
      };
    });
  }, [setPreviews]);

  return {
    onCropCompleted,
    onCropCanceled,
    open,
    cropArea,
    setOpen,
  };
}

export function usePreviewDropZone({
  onDropAccepted,
  onDropRejected,
  isLoading,
  previews,
  setPreviews,
  ...option
}: DropzoneProps) {
  const { onCropCompleted, onCropCanceled, open, setOpen, cropArea } =
    useCropper({
      onDropAccepted,
      setPreviews,
      previews,
    });

  const onCompleted = React.useCallback(async () => {
    if (!cropArea.current) return;
    if (!previews.crop) return;
    try {
      const croppedImage = await getCroppedImg(previews.crop, cropArea.current);

      onCropCompleted(croppedImage.url, croppedImage.file);
    } catch {
      toast.error("画像をトリミングできませんでした。");
    }
  }, [cropArea, onCropCompleted, previews.crop]);

  // Revoke Object URL
  React.useEffect(() => {
    return () => {
      const { preview, crop } = previews;

      if (crop) URL.revokeObjectURL(crop);

      if (preview) URL.revokeObjectURL(preview);
    };
  }, [previews]);

  // Preview Drop Zone
  const onDropRejectedCallback = useRef(onDropRejected);

  const onDropAcceptedPreview = React.useCallback(
    (files: File[]) => {
      const { createObjectURL } = window.URL || window.webkitURL;

      const file = files[0];
      setPreviews((ps) => ({
        ...ps,
        crop: createObjectURL(file),
      }));
      setOpen(true);
    },
    [setOpen, setPreviews]
  );

  const { getRootProps, getInputProps, isDragReject, isDragActive } =
    useDropzone({
      ...option,
      onDropAccepted: onDropAcceptedPreview,
      onDropRejected: onDropRejectedCallback.current,
      accept: typeToAccept("preview"),
      maxFiles: 1,
      maxSize: 10 * 1024 * 1024,
      disabled: isLoading,
    });

  return {
    isDragReject,
    isDragActive,
    previews,
    open,
    cropArea,
    setOpen,
    getRootProps,
    getInputProps,
    onCropCanceled,
    onCompleted,
  };
}
