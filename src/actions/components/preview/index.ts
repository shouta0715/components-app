"use server";

import { transformCode } from "@/scripts/ui-preview";
import { FileObject } from "@/services/files/get";

export async function transformCodeAction(files: FileObject[]) {
  return transformCode(files);
}
