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

function getExportStyle(target: RegExp): ExportStyle | undefined {
  if (
    target === EXPORT_DEFAULT_NAMED_FUNCTION_REGEX ||
    target === EXPORT_DEFAULT_VARIABLE_REGEX
  ) {
    return "default";
  }

  if (
    target === EXPORT_NAMED_FUNCTION_REGEX ||
    target === EXPORT_CONST_ARROW_FUNCTION_REGEX ||
    target === EXPORT_NAMED_REGEX
  ) {
    return "named";
  }

  return undefined;
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

export function getExportComponentName(
  targets: string[],
  functionName: string
): {
  exportStyle: ExportStyle;
} {
  let exportStyle: ExportStyle | undefined;

  for (const regex of EXPORT_COMPONENT_REGEXES) {
    const matches = targets.map((target) => target.match(regex));

    if (!matches || matches.length === 0) continue;

    const names = matches.map((match) => match?.[1]);

    const inCloudName = names.includes(functionName);

    if (!inCloudName) continue;

    exportStyle = getExportStyle(regex);

    if (exportStyle) break;
  }

  if (!exportStyle) throw new PackageError();

  return {
    exportStyle,
  };
}

export function replaceImports(target: string): string {
  const resolved = resolveDynamicImports(target);
  const result = resolveStaticImports(resolved);

  return result;
}
