"server only";

import { CompilerError } from "@/lib/errors";
import { compileTypescript } from "@/modules/compilers/ts";
import { minify } from "@/modules/minify";
import { replaceImports } from "@/modules/package";
import { Target, TransformedCode } from "@/modules/types";

import { concatCodes } from "@/modules/utils/concat";
import { getFiles } from "@/services/files/get";
import { Code } from "@/types/drizzle";

async function transformCode({ target, extension }: Target): Promise<Target> {
  let result = target;

  if (
    extension === "ts" ||
    extension === "tsx" ||
    extension === "jsx" ||
    extension === "js"
  ) {
    const { result: r, error } = compileTypescript(result);

    if (error || !r) {
      throw new CompilerError();
    }

    result = r;
  }

  if (extension !== "html" && extension !== "css") {
    result = replaceImports(result);
  }

  if (result !== "") {
    result = await minify({ target: result, extension });
  }

  return {
    target: result,
    extension,
  };
}

export async function codeBundler(codes: Code[]): Promise<TransformedCode> {
  const files = await getFiles(codes);

  const transformed = await Promise.all(
    files.map((file) =>
      transformCode({ target: file.file, extension: file.extension })
    )
  );

  const result = concatCodes(transformed);

  // console.log(result);

  return result;
}
