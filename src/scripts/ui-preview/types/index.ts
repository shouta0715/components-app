import {
  CSS_MIME_TYPE,
  ERROR_MESSAGES,
  HTML_MIME_TYPE,
  JAVASCRIPT_MIME_TYPE,
} from "@/scripts/ui-preview/constant";
import { FileObject } from "@/services/files/get";
import { Extension } from "@/types/file";

export type MIMETYPE =
  | typeof HTML_MIME_TYPE
  | typeof CSS_MIME_TYPE
  | typeof JAVASCRIPT_MIME_TYPE;

export type CompiledFile = FileObject & {
  originallyExtension?: Extension;
};

export type TransformedFile = {
  content: string;
  mimeType: MIMETYPE;
  extension: Extension;
  originallyExtension?: Extension;
};

type ErrorMessages = typeof ERROR_MESSAGES;
export type ErrorMessage = ErrorMessages[keyof ErrorMessages];

export type SuccessTransformedData = {
  componentName: string | null;
  files: TransformedFile[];
};

export type TransformedResult =
  | {
      data: SuccessTransformedData;
      error: false;
    }
  | {
      data: null;
      error: true;
      message: ErrorMessage;
    };
