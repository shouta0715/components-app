import { Extension } from "@prisma/client";
import { extension } from "mime-types";
import { throwHttpErrorFromStatus } from "@/lib/errors";
import { UploadFileInput } from "@/lib/schema/server/files";

type ResData = {
  id: string;
  url: string;
  fields: Record<string, string>;
};

export async function uploadImage(file: File | Blob) {
  const ex = extension(file.type);
  const type = encodeURIComponent(file.type);

  const res = await fetch(`/api/images?extension=${ex}&type=${type}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throwHttpErrorFromStatus(res.status);

  const { data } = (await res.json()) as { data: ResData };

  const formData = new FormData();

  Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });

  const res2 = await fetch(data.url, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  if (!res2.ok) throwHttpErrorFromStatus(res2.status);

  return `${data.id}.${ex}`;
}

export async function deleteImage(id: string) {
  const res = await fetch(`/api/images/components/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throwHttpErrorFromStatus(res.status);
}

export async function replacementImage(file: File | Blob, id: string) {
  await deleteImage(id);

  return uploadImage(file);
}

export async function uploadFile(
  file: File | Blob,
  ex: Extension,
  id: string,
  name: string
): Promise<UploadFileInput> {
  const res = await fetch(`/api/files?extension=${ex}&key=${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throwHttpErrorFromStatus(res.status);

  const { data } = (await res.json()) as { data: ResData };

  const formData = new FormData();

  Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string | Blob);
  });

  const res2 = await fetch(data.url, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  if (!res2.ok) throwHttpErrorFromStatus(res2.status);

  return {
    extension: ex,
    objectId: data.id,
    name,
  };
}
