import { useWatch } from "react-hook-form";
import { TogglePreviewTypeProps } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/types/toggle-preview-type";

export function useTogglePreviewType({
  defaultType,
  setPreviewType,
  control,
}: TogglePreviewTypeProps) {
  const type = useWatch({
    name: "previewType.type",
    defaultValue: defaultType,
    control,
  });

  const onCheckedChange = () => {
    setPreviewType(type === "html" ? "react" : "html");
  };

  return {
    type,
    onCheckedChange,
  };
}
