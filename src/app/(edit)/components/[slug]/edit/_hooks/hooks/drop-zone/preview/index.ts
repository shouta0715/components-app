import React, { useRef } from "react";
import {
  Accept,
  DropzoneOptions,
  FileRejection,
  useDropzone,
} from "react-dropzone";

export const accepts = {
  preview: ".png,.jpg,.jpeg,.gif,.webp",
  files: ".html,.css,.js,.ts,.jsx,.tsx.",
};

export type DropzoneProps = {
  onDropAccepted: (files: File) => void;
  onDropRejected: (files: FileRejection[]) => void;
  defaultValue?: string;
} & Omit<
  DropzoneOptions,
  "onDropAccepted" | "accept" | "maxFiles" | "maxSize" | "onDropRejected"
>;

function typeToAccept(type: keyof typeof accepts): Accept {
  switch (type) {
    case "preview":
      return {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
        "image/gif": [".gif"],
        "image/webp": [".webp"],
      };
    case "files":
      return {
        "text/html": [".html"],
        "text/css": [".css"],
        "text/javascript": [".js"],
        "text/typescript": [".ts"],
        "application/javascript": [".jsx", ".js"],
        "application/typescript": [".tsx", ".ts"],
      };
    default:
      throw new Error("Invalid type");
  }
}

export function usePreviewDropZone({
  onDropAccepted,
  onDropRejected,
  defaultValue,
  ...option
}: DropzoneProps) {
  const [preview, setPreview] = React.useState(defaultValue);

  React.useEffect(() => {
    return () => {
      if (!preview) return;
      if (preview === defaultValue) return;

      URL.revokeObjectURL(preview);
    };
  }, [defaultValue, preview]);

  const onDropRejectedCallback = useRef(onDropRejected);

  const onDropAcceptedPreview = React.useCallback(
    (files: File[]) => {
      const { createObjectURL } = window.URL || window.webkitURL;

      const file = files[0];
      setPreview(createObjectURL(file));
      onDropAccepted(file);
    },
    [onDropAccepted]
  );

  const { getRootProps, getInputProps, isDragReject, isDragActive } =
    useDropzone({
      ...option,
      onDropAccepted: onDropAcceptedPreview,
      onDropRejected: onDropRejectedCallback.current,
      accept: typeToAccept("preview"),
      maxFiles: 1,
      maxSize: 10 * 1024 * 1024,
    });

  return {
    getRootProps,
    getInputProps,
    isDragReject,
    isDragActive,
    preview,
  };
}
