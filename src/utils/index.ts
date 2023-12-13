import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Extension } from "@/types/file";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getContentType = (type: Extension) => {
  if (type === "tsx") {
    return "text/typescript-jsx";
  }

  if (type === "html") {
    return "text/html";
  }

  if (type === "css") {
    return "text/css";
  }

  if (type === "js") {
    return "text/javascript";
  }

  if (type === "jsx") {
    return "text/javascript-jsx";
  }

  return "text/typescript";
};
