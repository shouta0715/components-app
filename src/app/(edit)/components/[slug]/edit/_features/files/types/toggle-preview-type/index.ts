export type TogglePreviewTypeProps = {
  setPreviewType: (type: "html" | "react") => void;
  defaultType?: "html" | "react";
};
