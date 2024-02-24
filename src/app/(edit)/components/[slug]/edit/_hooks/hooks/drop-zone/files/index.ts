/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { UseFormSetError } from "react-hook-form";
import { v4 as randomUUID } from "uuid";
import {
  accepts,
  typeToAccept,
} from "@/app/(edit)/components/[slug]/edit/_hooks/utils/drop-zone";
import { EditFilesInput, InputFileType } from "@/lib/schema/client/edit/files";
import { safeValidate } from "@/lib/validation";
import { extensions } from "@/types/file";

export function useFilesDropZone({
  setFiles,
  setError,
  files,
}: {
  setError: UseFormSetError<EditFilesInput>;
  setFiles: (files: EditFilesInput["files"]) => void;
  files: EditFilesInput["files"];
}) {
  const searchParams = useSearchParams();

  const onDropAccepted = (acceptedFiles: File[]) => {
    const newFiles: InputFileType[] = [];

    for (const file of acceptedFiles) {
      const ex = file.name.split(".").pop();

      const val = safeValidate(ex, extensions);

      if (!val.success) continue;

      const uuid = randomUUID();

      newFiles.push({
        value: file,
        extension: val.output,
        type: "input",
        objectId: uuid,
      });
    }

    setFiles([...files, ...newFiles]);
  };
  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 3) {
      setError("files", {
        message: "入力できるファイルの数は3つまでです。",
      });

      return;
    }
    const exs = rejectedFiles.map((file) => file.file.name.split(".").pop());
    const message = `拡張子が${exs.join(
      ", "
    )}のファイルは入力できません。入力できる拡張子は、${accepts.files}です。`;

    setError("files", {
      message,
    });
  };

  const noClick = useMemo(() => {
    const tab = searchParams.get("tab");

    if (tab === "code") {
      return files.length !== 0;
    }

    const hasPreviewFile = files.find(
      (file) =>
        file.extension === "html" ||
        file.extension === "jsx" ||
        file.extension === "tsx"
    );

    return Boolean(hasPreviewFile);
  }, [files, searchParams]);

  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    noClick,
    multiple: true,
    maxFiles: 3 - files.length,
    noDragEventsBubbling: true,
    onDropAccepted,
    onDropRejected,
    accept: typeToAccept("files"),
  });

  return {
    getInputProps,
    getRootProps,
    open,
    isDragActive,
  };
}
