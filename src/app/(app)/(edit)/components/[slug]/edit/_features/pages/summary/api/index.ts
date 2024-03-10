import { useMutation } from "@tanstack/react-query";
import { DeepPartial } from "react-hook-form";
import { replacementImage, uploadImage } from "@/lib/aws/handlers";
import { throwHttpErrorFromStatus } from "@/lib/errors";
import { ComponentUpdateInput } from "@/lib/schema/server/component";

async function updateSummary({
  slug,
  input,
}: {
  slug: string;
  input: ComponentUpdateInput;
}) {
  const res = await fetch(`/api/components/${slug}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) throwHttpErrorFromStatus(res.status);
}

export function useMutateComponent(slug: string) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (input: ComponentUpdateInput) => updateSummary({ slug, input }),
  });

  return { mutateAsync, isPending };
}

async function imageUploader({
  file,
  slug,
  prevValue,
}: {
  file: File | Blob;
  slug: string;
  prevValue?: string | DeepPartial<File> | DeepPartial<Blob>;
}) {
  if (prevValue) {
    return replacementImage(file, slug);
  }

  return uploadImage(file);
}

export const useMutateImage = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: imageUploader,
  });

  return { mutateAsync, isPending };
};
