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
  targets: { id: string; file: string }[],
  functionName: string
): {
  exportStyle: ExportStyle;
  mainFileId: string;
} {
  let exportStyle: ExportStyle | undefined;
  let mainFileId: string | undefined;

  for (const regex of EXPORT_COMPONENT_REGEXES) {
    const matches = targets.map((target) => ({
      regex: target.file.match(regex),
      id: target.id,
    }));

    if (!matches || matches.length === 0) continue;

    const files = matches.map((match) => ({
      name: match?.regex?.[1],
      id: match.id,
    }));

    const mailFile = files.find((file) => file?.name === functionName);

    if (!mailFile) continue;

    exportStyle = getExportStyle(regex);
    mainFileId = mailFile.id;

    if (exportStyle) break;
  }

  if (!exportStyle || !mainFileId) throw new PackageError();

  return {
    exportStyle,
    mainFileId,
  };
}

export function replaceImports(target: string): string {
  const resolved = resolveDynamicImports(target);
  const result = resolveStaticImports(resolved);

  return result;
}
