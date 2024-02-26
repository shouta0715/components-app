import { useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { DeepPartial } from "react-hook-form";
import {
  useMutateImage,
  useMutateSummary,
} from "@/app/(edit)/components/[slug]/edit/_features/summary/api";
import {
  editStatusAtom,
  editValueStatesAtom,
} from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import { SummaryUpdateInputValue } from "@/app/(edit)/components/[slug]/edit/_hooks/types";
import { getComponentChangedValues } from "@/app/(edit)/components/[slug]/edit/_hooks/utils";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";
import { ComponentUpdateInput } from "@/lib/schema/server/component";
import { Params } from "@/types/next";

type UseComponentUpdaterProps = {
  defaultValues?: Readonly<DeepPartial<EditSummaryInput>>;
  reset: (data: EditSummaryInput) => void;
};

export function useComponentUpdater({
  reset,
  defaultValues,
}: UseComponentUpdaterProps) {
  const { slug } = useParams<Params["params"]>();

  const setEditStatus = useSetAtom(editStatusAtom);
  const setAtomValues = useSetAtom(editValueStatesAtom);

  const { mutateAsync, isPending: isMutating } = useMutateSummary(slug);
  const { mutateAsync: uploadImage, isPending: isUploading } = useMutateImage();
  async function onSubmit(
    data: EditSummaryInput,
    updateInput?: ComponentUpdateInput
  ) {
    try {
      setEditStatus((prev) => ({
        ...prev,
        summary: { ...prev.summary, status: "LOADING" },
      }));

      let previewUrl: string;

      if (data.previewUrl.type !== "default") {
        const id = await uploadImage({
          file: data.previewUrl.value,
          slug,
          prevValue: defaultValues?.previewUrl?.value,
        });

        previewUrl = id;
      } else {
        previewUrl = data.previewUrl.value;
      }

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
    } finally {
      setEditStatus((prev) => ({
        ...prev,
        summary: { ...prev.summary, status: "EDITING" },
      }));
    }
  }

  return { onSubmit, isMutating, isUploading };
}
