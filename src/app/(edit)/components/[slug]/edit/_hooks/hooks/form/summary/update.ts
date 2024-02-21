import { useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import {
  editStatusAtom,
  editValueStatesAtom,
} from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import {
  useMutateImage,
  useMutateSummary,
} from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/query/summary";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";
import { ComponentUpdateInput } from "@/lib/schema/server/component";
import { Params } from "@/types/next";

type UseComponentUpdaterProps = {
  defaultValues: EditSummaryInput;
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
    setEditStatus((prev) => ({
      ...prev,
      summary: { ...prev.summary, status: "LOADING" },
    }));

    let previewUrl: string;

    if (data.previewUrl.type !== "default") {
      const id = await uploadImage(data.previewUrl.value);
      previewUrl = id;
    } else {
      previewUrl = data.previewUrl.value;
    }

    const input: Omit<Required<ComponentUpdateInput>, "draft" | "document"> = {
      name: data.name,
      description: data.description,
      categoryName: data.categoryName,
      previewUrl,
    };

    const changedDataValues = Object.fromEntries(
      Object.entries(input).filter(([key, value]) => {
        if (key !== "previewUrl")
          return value !== defaultValues[key as keyof EditSummaryInput];

        return value !== defaultValues.previewUrl.value;
      })
    );

    const { success } = await mutateAsync({
      ...changedDataValues,
      ...updateInput,
    });

    if (!success) return;

    setEditStatus((prev) => ({
      ...prev,
      summary: { ...prev.summary, status: "EDITING" },
    }));

    const newPreviewUrl = { type: "default", value: input.previewUrl } as const;

    reset({
      ...data,
      previewUrl: newPreviewUrl,
    });

    setAtomValues((prev) => ({
      ...prev,
      summary: { ...data, previewUrl: newPreviewUrl },
    }));
  }

  return { onSubmit, isMutating, isUploading };
}
