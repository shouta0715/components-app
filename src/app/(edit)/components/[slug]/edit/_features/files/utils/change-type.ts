import { PreviewType } from "@/lib/schema/client/edit/files";

type GetNewPreviewTypeProps = {
  type: "html" | "react";
  prevFunctionName: string | null;
};

export const getNewPreviewType = ({
  type,
  prevFunctionName,
}: GetNewPreviewTypeProps): PreviewType => {
  if (type === "html") {
    return {
      type,
      functionName: null,
    };
  }

  return {
    type,
    functionName: prevFunctionName || "",
  };
};
