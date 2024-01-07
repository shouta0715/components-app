import { PostMessageError } from "@/components/elements/files/ui-preview/error/errors";
import { MessageAction } from "@/scripts/ui-preview/types";

export type ReceiveData =
  | {
      height?: number;
      error: false;
      action: MessageAction;
    }
  | {
      error: true;
      action: MessageAction;
      message: string;
    };

export type PostMessageQuery = {
  isPending: boolean;
  height: number;
  error: PostMessageError | null;
};
