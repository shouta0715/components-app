export const HTML_MIME_TYPE = "text/html" as const;
export const CSS_MIME_TYPE = "text/css" as const;
export const JAVASCRIPT_MIME_TYPE = "application/javascript" as const;
export const RELOAD_ACTION = "reload" as const;
export const RENDER_ACTION = "render" as const;
export const EXPORT_DEFAULT_STYLE = "default" as const;
export const EXPORT_NAMED_STYLE = "named" as const;
export const PREVIEW_TIMEOUT = 30000 as const;

/*
********************
Error Messages
********************
*/

const BAD_COMBINATION_EXTENSIONS_ERROR_MESSAGE =
  "同じ拡張子のファイルが複数含まれている場合やJavaScriptとTypeScriptのファイルが混在している場合はプレビューできません。" as const;

const COMPILE_ERROR_MESSAGE =
  "コンパイル中にエラーが発生しました。ReactまたはTypeScriptのコードを確認後、再度お試しください。" as const;

export const ERROR_MESSAGES = {
  BAD_COMBINATION_EXTENSIONS_ERROR_MESSAGE,
  COMPILE_ERROR_MESSAGE,
} as const;

/* 
*********************************************
Code Transformer Constants
*********************************************
*/

export const ESM_BASE_URL = "https://esm.sh" as const;
export const DYNAMIC_IMPORT_REGEX = /import\(['"](.+?)['"]\)/g;

export const STATIC_IMPORT_REGEX = /import\s*(.*?)\s*from\s*['"](.*?)['"];?/g;

/* 
*********************************************
Export Component Regex
*********************************************
*/

export const EXPORT_NAMED_FUNCTION_REGEX = /export function (\w+)/;
export const EXPORT_CONST_ARROW_FUNCTION_REGEX = /export const (\w+) = \(\) =>/;
export const EXPORT_DEFAULT_NAMED_FUNCTION_REGEX =
  /export default function (\w+)/;
export const EXPORT_DEFAULT_VARIABLE_REGEX = /export default (\w+)/;
export const EXPORT_NAMED_REGEX = /export \{ *(\w+)[, ]*/;

export const EXPORT_COMPONENT_REGEXES = [
  EXPORT_NAMED_FUNCTION_REGEX,
  EXPORT_CONST_ARROW_FUNCTION_REGEX,
  EXPORT_DEFAULT_NAMED_FUNCTION_REGEX,
  EXPORT_DEFAULT_VARIABLE_REGEX,
  EXPORT_NAMED_REGEX,
] as const;
