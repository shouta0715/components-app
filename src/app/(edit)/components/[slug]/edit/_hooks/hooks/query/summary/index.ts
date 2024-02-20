import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadImage } from "@/lib/aws/handlers";
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

  if (!res.ok) {
    throwHttpErrorFromStatus(res.status);
  }

  const data = (await res.json()) as { success: boolean };

  return data;
}

export function useMutateSummary(slug: string) {
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

export const useMutateImage = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadImage,
    onError: () => {
      toast.error("画像をアップロードできませんでした", {
        description: "環境が良いところで再度お試しください",
      });
    },
  });

  return { mutateAsync, isPending };
};
