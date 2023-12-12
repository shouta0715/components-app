import { ExtensionType } from "@/types/file";

export type TransformedCode = {
  result: string;
  extension: Extract<ExtensionType, "html" | "tsx" | "jsx">;
};

export type Target = {
  target: string;
  extension: ExtensionType;
};
