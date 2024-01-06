import {
  DYNAMIC_IMPORT_REGEX,
  ESM_BASE_URL,
  EXPORT_COMPONENT_REGEXES,
  EXPORT_CONST_ARROW_FUNCTION_REGEX,
  EXPORT_DEFAULT_NAMED_FUNCTION_REGEX,
  EXPORT_DEFAULT_VARIABLE_REGEX,
  EXPORT_NAMED_FUNCTION_REGEX,
  EXPORT_NAMED_REGEX,
  STATIC_IMPORT_REGEX,
} from "@/scripts/ui-preview/constant";
import { PackageError } from "@/scripts/ui-preview/errors";
import { ExportStyle } from "@/scripts/ui-preview/types";

function resolvePackage(target: string): string {
  const isNotLibrary = target.startsWith(".");

  if (isNotLibrary) return target;

  return `${ESM_BASE_URL}/${target}`;
}

function resolveDynamicImports(target: string): string {
  const resolved = target.replace(DYNAMIC_IMPORT_REGEX, (_, pk) => {
    return `import("${resolvePackage(pk)}")`;
  });

  return resolved;
}

function resolveStaticImports(target: string): string {
  const resolved = target.replace(
    STATIC_IMPORT_REGEX,
    (_: string, im: string, pk: string) => {
      return `import ${im} from "${resolvePackage(pk)}";`;
    }
  );

  return resolved;
}

export function getExportComponentName(target: string): {
  result: string;
  exportStyle: ExportStyle;
} {
  let result: string | undefined;
  let exportStyle: ExportStyle | undefined;

  // eslint-disable-next-line no-restricted-syntax
  for (const regex of EXPORT_COMPONENT_REGEXES) {
    const match = target.match(regex);

    // eslint-disable-next-line no-continue
    if (!match) continue;

    if (result && result !== "function") break;

    const [, name] = match;

    if (
      regex === EXPORT_DEFAULT_NAMED_FUNCTION_REGEX ||
      regex === EXPORT_DEFAULT_VARIABLE_REGEX
    ) {
      exportStyle = "default";
    }

    if (
      regex === EXPORT_NAMED_FUNCTION_REGEX ||
      regex === EXPORT_CONST_ARROW_FUNCTION_REGEX ||
      regex === EXPORT_NAMED_REGEX
    ) {
      exportStyle = "named";
    }
    result = name;
  }

  if (!result || !exportStyle) throw new PackageError();

  return {
    result,
    exportStyle,
  };
}

export function replaceImports(target: string): string {
  const resolved = resolveDynamicImports(target);
  const result = resolveStaticImports(resolved);

  return result;
}
