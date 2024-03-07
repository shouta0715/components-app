import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
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
  const endpoint = `${process.env.NEXT_PUBLIC_STORAGE_URL}/images`;

  return `${endpoint}/${id}`;
};

export const getOGImageUrl = (url: string) => {
  const endpoint = `${process.env.NEXT_PUBLIC_STORAGE_URL}/metadata/og`;

  return `${endpoint}?url=${url}`;
};

export const getDisplayName = (name?: string | null, slice?: number) => {
  if (!name) return "Unknown";

  if (!slice) return name;

  if (name.length > slice) {
    return `${name.slice(0, slice)}...`;
  }

  return name;
};
