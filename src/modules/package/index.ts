import {
  DYNAMIC_IMPORT_REGEX,
  ESM_BASE_URL,
  STATIC_IMPORT_REGEX,
} from "@/lib/constant";

function resolvePackage(target: string): string {
  const isLibrary = target.startsWith(".");

  if (isLibrary) {
    return target;
  }

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
    (raw: string, comment: string, _, im: string, pk: string) => {
      if (comment) {
        return raw;
      }

      return `import ${im}"${resolvePackage(pk)}"`;
    }
  );

  return resolved;
}

export function replaceImports(target: string): string {
  const resolved = resolveDynamicImports(target);
  const result = resolveStaticImports(resolved);

  return result;
}
