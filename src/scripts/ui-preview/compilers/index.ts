import { Extension } from "@prisma/client";
import { Loader, TransformOptions, transform } from "esbuild";
import { CompilerError } from "@/scripts/ui-preview/errors";

const defaultCompilerOptions: TransformOptions = {
  minify: true,
  treeShaking: true,
  format: "esm",
  jsx: "automatic",
  charset: "utf8",
  sourcemap: false,
  legalComments: "none",
};

function extensionToLoader(extension: Extension): Loader {
  switch (extension) {
    case "js":
      return "js";
    case "jsx":
      return "jsx";
    case "ts":
      return "ts";
    case "tsx":
      return "tsx";
    case "css":
      return "css";
    default:
      throw new CompilerError();
  }
}

export const compile = async (
  code: string,
  extension: Extension,
  options?: TransformOptions
): Promise<{
  result: string;
  error: boolean;
  message: string;
}> => {
  const { code: outputText } = await transform(code, {
    ...defaultCompilerOptions,
    ...options,
    loader: extensionToLoader(extension),
  });

  if (!outputText) {
    return {
      result: "",
      error: true,
      message: "output is empty",
    };
  }

  return {
    result: outputText,
    error: false,
    message: "Successfully compiled",
  };
};
