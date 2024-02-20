import { extension } from "mime-types";
import { throwHttpErrorFromStatus } from "@/lib/errors";

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
