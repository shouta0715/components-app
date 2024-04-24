/*
*********************************************
Application Constants
*********************************************
*/

import { RedirectType } from "next/navigation";

const {
  NEXT_PUBLIC_AWS_S3_ENDPOINT,
  NEXT_PUBLIC_STORAGE_URL,
  NEXT_PUBLIC_SANDBOX_URL,
  AWS_S3_ENDPOINT,
} = process.env;

export const PUBLIC_BUCKET_NAME = "ui-trade-public" as const;
export const PRIVATE_BUCKET_NAME = "ui-trade-private" as const;
export const PREVIEW_BUCKET_NAME = "ui-trade-preview" as const;
// eslint-disable-next-line @typescript-eslint/naming-convention
export type BUCKET_NAME =
  | typeof PUBLIC_BUCKET_NAME
  | typeof PRIVATE_BUCKET_NAME
  | typeof PREVIEW_BUCKET_NAME;

export const OBJECT_PUBLIC_BASE_URL =
  `${NEXT_PUBLIC_STORAGE_URL}/files` as const;

export const OBJECT_PRIVATE_BASE_URL =
  `${AWS_S3_ENDPOINT}/${PRIVATE_BUCKET_NAME}` as const;

export const SANDBOX_URL = NEXT_PUBLIC_SANDBOX_URL as string;

export const PREVIEW_URL = `${
  AWS_S3_ENDPOINT || NEXT_PUBLIC_AWS_S3_ENDPOINT
}/${PREVIEW_BUCKET_NAME}` as const;
/*
*********************************************
Next.js Constants
*********************************************
*/

export const REDIRECT_PUSH = RedirectType.push as const;
export const REDIRECT_REPLACE = RedirectType.replace as const;

/*
*********************************************
S3 Constants
*********************************************
*/

// 10mb
export const S3_MAX_FILE_SIZE = 10485760 as const;
