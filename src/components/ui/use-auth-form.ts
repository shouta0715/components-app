import { notFound, useRouter } from "next/navigation";
import { ErrorToast, toast, useToast } from "@/components/ui/use-toast";
import {
  NotFoundError,
  UnauthorizedError,
  throwHttpErrorFromStatus,
} from "@/lib/errors";
import { ActionResult } from "@/lib/next/actions";

export function useAuthForm(
  action: (formData: FormData) => Promise<ActionResult>,
  errorToasts?: ErrorToast
) {
  const router = useRouter();
  const { toast: onToast } = useToast();

  async function clientActions(formData: FormData) {
    try {
      const result = await action(formData);

      if (!result.success) {
        throwHttpErrorFromStatus(result.status);

        return;
      }

      if (!result) return;

      const { isToast, redirect } = result;

      if (isToast) {
        const { title, message } = result.toast;

        onToast({
          title,
          description: message,
        });
      }

      if (redirect) router.push(redirect);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        router.push("/auth/login", {
          scroll: false,
        });

        return;
      }

      if (error instanceof NotFoundError) notFound();

      if (!errorToasts) throw error;

      toast({
        title: errorToasts.title,
        description: errorToasts.message,
      });
    }
  }

  return { clientActions };
}
