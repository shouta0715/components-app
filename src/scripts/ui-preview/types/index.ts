import {
  CSS_MIME_TYPE,
  ERROR_MESSAGES,
  EXPORT_DEFAULT_STYLE,
  EXPORT_NAMED_STYLE,
  HTML_MIME_TYPE,
  JAVASCRIPT_MIME_TYPE,
  RELOAD_ACTION,
  RENDER_ACTION,
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
  id: string;
};

type ErrorMessages = typeof ERROR_MESSAGES;
export type ErrorMessage = ErrorMessages[keyof ErrorMessages];

export type MessageAction = typeof RELOAD_ACTION | typeof RENDER_ACTION;

export type ExportStyle =
  | typeof EXPORT_DEFAULT_STYLE
  | typeof EXPORT_NAMED_STYLE;

export type SuccessTransformedData =
  | {
      componentName: string | null;
      exportStyle: ExportStyle | null;
      files: TransformedFile[];
      mainFileId: string;
      action: Extract<MessageAction, "render">;
    }
  | {
      action: Extract<MessageAction, "reload">;
    };

export type TransformedResult = {
  data: SuccessTransformedData;
};
