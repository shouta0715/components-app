import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PREVIEW_BUCKET_NAME } from "@/lib/constant";
import { Extension } from "@/types/file";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ContentType = "text/html" | "text/css" | "text/javascript";

export const getContentType = (type: Extension): ContentType => {
  switch (type) {
    case "html":
      return "text/html";
    case "css":
      return "text/css";
    case "js":
    case "ts":
    case "jsx":
    case "tsx":
      return "text/javascript";
    default:
      throw new Error(type satisfies never);
  }
};

export const getImageUrl = (id: string) => {
  const endpoint = process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT;

  return `${endpoint}/${PREVIEW_BUCKET_NAME}/${id}`;
};

export const getDisplayName = (name?: string | null, slice?: number) => {
  if (!name) return "Unknown";

  if (!slice) return name;

  if (name.length > slice) {
    return `${name.slice(0, slice)}...`;
  }

  return name;
};
