import { HttpError, InternalServerError } from "@/lib/errors";

type ActionErrorResult<E extends HttpError = InternalServerError> = {
  success: false;
  redirect?: string;
  message: E["message"];
  status: E["status"];
};

type ActionSuccessResult =
  | {
      success: true;
      redirect?: string;
      isToast?: false;
    }
  | {
      success: true;
      redirect?: string;
      isToast: true;
      toast: {
        title: string;
        message: string;
      };
    };

export type ActionResult = ActionErrorResult | ActionSuccessResult;
