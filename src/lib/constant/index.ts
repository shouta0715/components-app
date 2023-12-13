/*
*********************************************
Application Constants
*********************************************
*/

export const PUBLIC_BUCKET_NAME = "ui-trade-public" as const;
export const PRIVATE_BUCKET_NAME = "ui-trade-private" as const;
export const PREVIEW_BUCKET_NAME = "ui-trade-preview" as const;
// eslint-disable-next-line @typescript-eslint/naming-convention
export type BUCKET_NAME =
  | typeof PUBLIC_BUCKET_NAME
  | typeof PRIVATE_BUCKET_NAME
  | typeof PREVIEW_BUCKET_NAME;

export const OBJECT_PUBLIC_BASE_URL =
  `${process.env.AWS_S3_ENDPOINT}/${PUBLIC_BUCKET_NAME}` as const;

export const OBJECT_PRIVATE_BASE_URL =
  `${process.env.AWS_S3_ENDPOINT}/${PRIVATE_BUCKET_NAME}` as const;

/* 
*********************************************
Code Transformer Constants
*********************************************
*/

export const ESM_BASE_URL = "https://esm.sh" as const;
export const DYNAMIC_IMPORT_REGEX = /import\(['"](.+?)['"]\)/g;

export const STATIC_IMPORT_REGEX =
  /(\/\/\s*)?(import\s+)(.*\s+from\s+)?['"](.*)['"];?/g;
