import { useMutation } from "@tanstack/react-query";
import { DeepPartial } from "react-hook-form";
import { toast } from "sonner";
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
    onSuccess: () => {
      toast.success("更新しました。");
    },
    onError: () => {
      toast.error("更新できませんでした。", {
        description: "環境が良いところで再度お試しください",
      });
    },
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
    onError: () => {
      toast.error("画像をアップロードできませんでした", {
        description: "環境が良いところで再度お試しください",
      });
    },
  });

  return { mutateAsync, isPending };
};
