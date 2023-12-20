import { act, renderHook } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { describe, expect, test, vi } from "vitest";
import { useAuthForm } from "@/components/ui/use-auth-form";
import * as toast from "@/components/ui/use-toast";

import * as errorFn from "@/lib/errors";
import { ActionResult } from "@/lib/next/actions";

function spyActions(result?: ActionResult) {
  const defaultResult: ActionResult = {
    success: true,
  };

  const arg: ActionResult = {
    ...defaultResult,
    ...result,
  };

  const action = vi.fn(() => Promise.resolve(arg));

  return { action, arg };
}

async function spyHooks(
  actionResult?: ActionResult,
  errorToasts?: toast.ErrorToast
) {
  const onToast = vi.fn();
  vi.spyOn(toast, "useToast").mockReturnValue({
    toast: onToast,
    dismiss: vi.fn(),
    toasts: [],
  });

  const { action } = spyActions(actionResult);

  const { result } = renderHook(() => useAuthForm(action, errorToasts));
  const formData = new FormData();

  const spyThrowError = vi.spyOn(errorFn, "throwHttpErrorFromStatus");

  return {
    clientActions: result.current.clientActions,
    formData,
    spyThrowError,
    onToast,
  };
}

describe("UI use auth form Test ", () => {
  test("if throw UnauthorizedError, redirect to /auth/login", async () => {
    const { message, status } = new errorFn.UnauthorizedError();
    const { spyThrowError, clientActions, formData } = await spyHooks({
      success: false,
      status,
      message,
    });

    await act(async () => clientActions(formData));

    expect(spyThrowError).toHaveBeenCalledWith(status);

    expect(mockRouter.pathname).toBe("/auth/login");
  });

  test("if throw NotFoundError, redirect to /404", async () => {
    const { message, status } = new errorFn.NotFoundError();
    const { spyThrowError, clientActions, formData } = await spyHooks(
      {
        success: false,
        status,
        message,
      },
      {
        title: "Error",
        message: "Not found",
      }
    );

    await act(async () => clientActions(formData));

    expect(spyThrowError).toHaveBeenCalledWith(404);

    expect(mockRouter.pathname).toBe("/404");
  });

  test("if error instance is not UnauthorizedError or NotFoundError, throw error", async () => {
    mockRouter.push("/");
    const { message, status } = new errorFn.InternalServerError();
    const { spyThrowError, clientActions, formData } = await spyHooks({
      success: false,
      status,
      message,
    });

    await act(async () =>
      expect(clientActions(formData)).rejects.toThrowError(message)
    );

    expect(spyThrowError).toHaveBeenCalledWith(status);

    expect(mockRouter.pathname).toBe("/");
  });

  test("if action result is success and is not provided toast, not call toast", async () => {
    const { clientActions, formData, onToast } = await spyHooks({
      success: true,
      isToast: false,
    });

    await act(async () => clientActions(formData));
    expect(onToast).not.toHaveBeenCalled();
  });

  test("if action result is success and is provided toast, call toast", async () => {
    const toastArg = {
      title: "Success",
      description: "Success",
    };

    const { clientActions, formData, onToast } = await spyHooks({
      success: true,
      isToast: true,
      toast: {
        title: toastArg.title,
        message: toastArg.description,
      },
    });

    await act(async () => clientActions(formData));

    expect(onToast).toHaveBeenCalledWith(toastArg);
  });
  test("if action result is success and is provided redirect, redirect to redirect", async () => {
    mockRouter.push("/");

    const resultPath = "/test";

    const { clientActions, formData } = await spyHooks({
      success: true,
      redirect: resultPath,
    });

    await act(async () => clientActions(formData));

    expect(mockRouter.pathname).toBe(resultPath);
  });
});
