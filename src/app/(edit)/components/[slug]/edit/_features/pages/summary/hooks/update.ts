import { useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import { DeepPartial } from "react-hook-form";
import {
  useMutateImage,
  useMutateComponent,
} from "@/app/(edit)/components/[slug]/edit/_features/pages/summary/api";
import { editValueStatesAtom } from "@/app/(edit)/components/[slug]/edit/_features/section/contexts";
import { SummaryUpdateInputValue } from "@/app/(edit)/components/[slug]/edit/_features/section/types";
import { getComponentChangedValues } from "@/app/(edit)/components/[slug]/edit/_features/section/utils";
import {
  EditSummaryInput,
  editSummarySchema,
} from "@/lib/schema/client/edit/summary";
import { ComponentUpdateInput } from "@/lib/schema/server/component";
import { safeValidate } from "@/lib/validation";
import { Params } from "@/types/next";

type UseComponentUpdaterProps = {
  defaultValues?: Readonly<DeepPartial<EditSummaryInput>>;
  reset: (data: EditSummaryInput) => void;
};

type OnSubmitProps = {
  data: EditSummaryInput;
  updateInput?: ComponentUpdateInput;
};

export function useComponentUpdater({
  reset,
  defaultValues,
}: UseComponentUpdaterProps) {
  const { slug } = useParams<Params["params"]>();

  const setAtomValues = useSetAtom(editValueStatesAtom);

  const { mutateAsync, isPending: isMutating } = useMutateComponent(slug);
  const { mutateAsync: uploadImage, isPending: isUploading } = useMutateImage();

  const onUploadImage = useCallback(
    async (preview: EditSummaryInput["previewUrl"]) => {
      if (preview.type !== "default") {
        const id = await uploadImage({
          file: preview.value,
          slug,
          prevValue: defaultValues?.previewUrl?.value,
        });

        return id;
      }

      return preview.value;
    },
    [defaultValues?.previewUrl?.value, slug, uploadImage]
  );

  const onSubmit = useCallback(
    async ({ data, updateInput }: OnSubmitProps) => {
      const previewUrl = await onUploadImage(data.previewUrl);

      const input: SummaryUpdateInputValue = {
        name: data.name,
        description: data.description,
        categoryName: data.categoryName,
        previewUrl,
      };

      const changedDataValues = getComponentChangedValues(input, defaultValues);

      await mutateAsync({
        ...changedDataValues,
        ...updateInput,
      });

      const newPreviewUrl = {
        type: "default",
        value: input.previewUrl,
      } as const;

      reset({
        ...data,
        previewUrl: newPreviewUrl,
      });

      setAtomValues((prev) => ({
        ...prev,
        summary: { ...data, previewUrl: newPreviewUrl },
      }));

      const allCreated = safeValidate(data, editSummarySchema);

      return allCreated.success;
    },
    [defaultValues, mutateAsync, onUploadImage, reset, setAtomValues]
  );

  return { onSubmit, isMutating, isUploading };
}
