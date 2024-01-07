"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  PostMessageError,
  RenderError,
  TimeOutError,
  UnknownMessageError,
} from "@/components/elements/files/ui-preview/error/errors";
import {
  PostMessageQuery,
  ReceiveData,
} from "@/components/elements/files/ui-preview/types";
import { SANDBOX_URL } from "@/lib/constant";
import { PREVIEW_TIMEOUT } from "@/scripts/ui-preview/constant";

import { SuccessTransformedData } from "@/scripts/ui-preview/types";

type Props = { inputData: SuccessTransformedData };

export function usePreviewIframe({ inputData }: Props) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLIFrameElement | null>(null);
  const [query, setQuery] = useState<PostMessageQuery>({
    isPending: true,
    height: 0,
    error: null,
  });

  const onThrowError = useCallback(
    (error: PostMessageError) => {
      if (timer.current) clearTimeout(timer.current);

      setQuery((prev) => ({
        ...prev,
        error,
      }));
    },
    [timer]
  );

  const onReloadIframe = useCallback(async () => {
    setQuery((prev) => ({ ...prev, isPending: true, error: null }));

    if (!ref.current || !ref.current.contentWindow) return;

    const message = JSON.stringify({ action: "reload" });

    ref.current.contentWindow.postMessage(message, SANDBOX_URL);
    timer.current = setTimeout(() => {
      onThrowError(new TimeOutError());
    }, PREVIEW_TIMEOUT);
  }, [onThrowError]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== SANDBOX_URL) return;

      const data = JSON.parse(e.data) as ReceiveData;

      if (timer.current) clearTimeout(timer.current);
      if (data.error) {
        onThrowError(new UnknownMessageError());

        return;
      }

      if (data.action === "render") {
        if (!data.height) {
          onThrowError(new RenderError());

          return;
        }

        setQuery({ isPending: false, height: data.height, error: null });

        return;
      }

      if (data.action === "reload") {
        setQuery((prev) => ({ ...prev, isPending: false, error: null }));

        return;
      }

      onThrowError(new UnknownMessageError());
    };

    window.addEventListener("message", onMessage);
    timer.current = setTimeout(() => {
      onThrowError(new TimeOutError());
    }, PREVIEW_TIMEOUT);

    return () => {
      window.removeEventListener("message", onMessage);

      if (timer.current) clearTimeout(timer.current);
    };
  }, [onThrowError]);

  const onLoadIframe = useCallback(
    async (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
      if (!e.target) return;

      const { contentWindow } = e.target as HTMLIFrameElement;

      if (!contentWindow) return;

      const message = JSON.stringify(inputData);

      contentWindow.postMessage(message, SANDBOX_URL);
    },
    [inputData]
  );

  return {
    ref,
    isPending: query.isPending,
    height: query.height,
    error: query.error,
    setQuery,
    onLoadIframe,
    reload: onReloadIframe,
  };
}
