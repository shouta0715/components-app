import ts from "typescript";

const defaultCompilerOptions: ts.CompilerOptions = {
  jsx: ts.JsxEmit.React,
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
};

export const compileTypescript = (
  code: string,
  options?: ts.CompilerOptions
): {
  result: string;
  error: boolean;
  message: string;
} => {
  const { outputText, diagnostics } = ts.transpileModule(code, {
    compilerOptions: {
      ...defaultCompilerOptions,
      ...options,
    },
  });

  if (!outputText) {
    return {
      result: "",
      error: true,
      message: "output is empty",
    };
  }

  if (!diagnostics || diagnostics.length === 0) {
    return {
      result: outputText,
      error: false,
      message: "Successfully compiled",
    };
  }

  const isErrors = diagnostics.some((diagnostic) => {
    return diagnostic.category === ts.DiagnosticCategory.Error;
  });

  return {
    result: outputText,
    error: isErrors,
    message: isErrors ? "Failed to compile" : "Successfully compiled",
  };
};
