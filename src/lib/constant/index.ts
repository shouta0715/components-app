/*
*********************************************
Application Constants
*********************************************
*/

import { RedirectType } from "next/navigation";

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

export const SANDBOX_URL = process.env.NEXT_PUBLIC_SANDBOX_URL as string;
/*
*********************************************
Next.js Constants
*********************************************
*/

export const REDIRECT_PUSH = RedirectType.push as const;
export const REDIRECT_REPLACE = RedirectType.replace as const;
