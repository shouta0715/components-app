import { Accept } from "react-dropzone";

export const accepts = {
  preview: ".png,.jpg,.jpeg,.gif,.webp",
  files: ".html,.css,.js,.ts,.jsx,.tsx.",
};

export function typeToAccept(type: keyof typeof accepts): Accept {
  switch (type) {
    case "preview":
      return {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
        "image/gif": [".gif"],
        "image/webp": [".webp"],
      };
    case "files":
      return {
        "text/html": [".html"],
        "text/css": [".css"],
        "text/javascript": [".js"],
        "text/typescript": [".ts"],
        "application/javascript": [".jsx", ".js"],
        "application/typescript": [".tsx", ".ts"],
      };
    default:
      throw new Error("Invalid type");
  }
}
