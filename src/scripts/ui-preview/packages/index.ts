import {
  DYNAMIC_IMPORT_REGEX,
  ESM_BASE_URL,
  EXPORT_COMPONENT_REGEX,
  STATIC_IMPORT_REGEX,
} from "@/scripts/ui-preview/constant";
import { CodeBundlerError } from "@/scripts/ui-preview/errors";

function resolvePackage(target: string): string {
  const isNotLibrary = target.startsWith(".");

  if (isNotLibrary) return target;

  return `${ESM_BASE_URL}/${target}`;
}

function resolveDynamicImports(target: string): string {
  const resolved = target.replace(DYNAMIC_IMPORT_REGEX, (_, pk) => {
    return `import(${resolvePackage(pk)})`;
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

export function getExportComponentName(target: string): string {
  let result: string | undefined;

  EXPORT_COMPONENT_REGEX.forEach((regex) => {
    const match = target.match(regex);

    if (!match || (result && result !== "function")) return;

    const [, name] = match;

    result = name;
  });

  if (!result) throw new CodeBundlerError();

  return result;
}

export function replaceImports(target: string): string {
  const resolved = resolveDynamicImports(target);
  const result = resolveStaticImports(resolved);

  return result;
}
