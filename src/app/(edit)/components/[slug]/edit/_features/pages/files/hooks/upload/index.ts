import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { DeepPartial } from "react-hook-form";
import { toast } from "sonner";
import {
  useMutateFiles,
  useUploadFiles,
} from "@/app/(edit)/components/[slug]/edit/_features/pages/files/api/files";
import { getChangedFilesValues } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/utils/change-values";
import {
  convertFiles,
  getResetDefaultFiles,
} from "@/app/(edit)/components/[slug]/edit/_features/pages/files/utils/convert";
import {
  editStatusAtom,
  editValueStatesAtom,
} from "@/app/(edit)/components/[slug]/edit/_features/section/contexts";
import { EditFilesInput } from "@/lib/schema/client/edit/files";
import { FilesUpdateInput, UploadFileInput } from "@/lib/schema/server/files";

type UseComponentFilesUpdaterProps = {
  defaultValues?: Readonly<DeepPartial<EditFilesInput>>;
  reset: (data: EditFilesInput) => void;
  slug: string;
};

export function useComponentFilesUpdater({
  defaultValues,
  reset,
  slug,
}: UseComponentFilesUpdaterProps) {
  const setEditStatus = useSetAtom(editStatusAtom);
  const setAtomValues = useSetAtom(editValueStatesAtom);

  const { mutateAsync, isPending } = useMutateFiles(slug);
  const { isPending: isUploading, mutateAsync: onUploadFiles } =
    useUploadFiles();

  const onSubmit = useCallback(
    async (data: EditFilesInput, draft?: boolean) => {
      setEditStatus((prev) => ({
        ...prev,
        files: { ...prev.files, status: "LOADING" },
      }));

      const { files, previewType } = data;

      const { defaultTypeFiles, uploadData, deleteFiles } = convertFiles({
        files,
        defaultFiles: defaultValues?.files,
      });

      try {
        let uploadFiles: UploadFileInput[] = [];

        if (uploadData.length > 0) {
          const uploadedFiles = await onUploadFiles(uploadData);

          uploadFiles = uploadedFiles.map((file) => ({
            objectId: file.objectId,
            extension: file.extension,
            name: file.name,
          }));
        }

        const functionName =
          previewType.type === "react" ? previewType.functionName : undefined;

        const input: FilesUpdateInput = {
          functionName,
          draft,
          uploadFiles,
          deleteFiles,
        };

        const values = getChangedFilesValues({
          input,
          defaultValues,
          defaultDraft: draft,
        });

        const ids = await mutateAsync(values);

        const resetFiles = getResetDefaultFiles({
          uploadFiles,
          ids,
          defaultTypeFiles,
        });

        const newData: EditFilesInput = {
          ...data,
          files: resetFiles,
        };

        reset(newData);

        setAtomValues((prev) => ({
          ...prev,
          files: newData,
        }));
      } catch (error) {
        toast.error("更新できませんでした。", {
          description: "環境が良いところで再度お試しください",
        });
      } finally {
        setEditStatus((prev) => ({
          ...prev,
          files: { ...prev.files, status: "EDITING" },
        }));
      }
    },
    [
      defaultValues,
      mutateAsync,
      onUploadFiles,
      reset,
      setAtomValues,
      setEditStatus,
    ]
  );

  return {
    onSubmit,
    isPending: isPending || isUploading,
  };
}
