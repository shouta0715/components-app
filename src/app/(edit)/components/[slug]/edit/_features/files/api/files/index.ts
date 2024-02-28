import { Extension } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/lib/aws/handlers";
import { throwHttpErrorFromStatus } from "@/lib/errors";
import { FilesUpdateInput } from "@/lib/schema/server/files";

export type FilesUploaderProps = {
  file: File | Blob;
  extension: Extension;
  id: string;
  name: string;
}[];

async function filesUploader(files: FilesUploaderProps) {
  return Promise.all(
    files.map(async ({ file, extension, id, name }) => {
      return uploadFile(file, extension, id, name);
    })
  );
}

export function useUploadFiles() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: filesUploader,
  });

  return { mutateAsync, isPending };
}

async function updateFiles({
  slug,
  input,
}: {
  slug: string;
  input: FilesUpdateInput;
}) {
  const res = await fetch(`/api/components/${slug}/files`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) throwHttpErrorFromStatus(res.status);

  const { ids } = (await res.json()) as { ids: { [key: string]: number } };

  return ids;
}

export function useMutateFiles(slug: string) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (input: FilesUpdateInput) => updateFiles({ slug, input }),
  });

  return { mutateAsync, isPending };
}
