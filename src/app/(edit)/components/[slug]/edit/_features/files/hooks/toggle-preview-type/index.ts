import { useState } from "react";
import { TogglePreviewTypeProps } from "@/app/(edit)/components/[slug]/edit/_features/files/types/toggle-preview-type";

export function useTogglePreviewType({
  defaultType,
  setPreviewType,
}: TogglePreviewTypeProps) {
  const [type, setType] = useState<"html" | "react">(defaultType || "html");

  const onCheckedChange = () => {
    setType((prev) => (prev === "html" ? "react" : "html"));
    setPreviewType(type === "html" ? "react" : "html");
  };

  return {
    type,
    onCheckedChange,
  };
}
