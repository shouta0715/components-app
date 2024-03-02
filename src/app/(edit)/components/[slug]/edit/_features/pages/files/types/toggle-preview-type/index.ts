import { Control } from "react-hook-form";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

export type TogglePreviewTypeProps = {
  setPreviewType: (type: "html" | "react") => void;
  defaultType?: "html" | "react";
  control: Control<EditFilesInput>;
};
