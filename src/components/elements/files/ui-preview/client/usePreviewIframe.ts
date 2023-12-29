"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { PREVIEW_TIMEOUT } from "@/scripts/ui-preview/constant";
import { SuccessTransformedData } from "@/scripts/ui-preview/types";

type Props = { inputData: SuccessTransformedData; componentId: string };

const SANDBOX_URL = process.env.NEXT_PUBLIC_SANDBOX_URL as string;

type ResolveData = {
  height: number;
};

async function getPostMessage() {
  const resolveHandler = new Promise<ResolveData>((resolve) => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== SANDBOX_URL) return;

      const data = JSON.parse(e.data) as ResolveData;
      resolve(data);
      window.removeEventListener("message", onMessage);
    };

    window.addEventListener("message", onMessage);
  });

  const rejectHandler = new Promise<never>((_, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Timeout"));
      clearTimeout(timer);
    }, PREVIEW_TIMEOUT);
  });

  return Promise.race([resolveHandler, rejectHandler]);
}

async function onReloadIframe(ref: HTMLIFrameElement | null) {
  if (!ref) return;

  const { contentWindow } = ref;

  if (!contentWindow) return;

  const message = JSON.stringify({ action: "reload" });

  contentWindow.postMessage(message, SANDBOX_URL);

  const resolveHandler = new Promise<void>((resolve) => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== SANDBOX_URL) return;

      resolve();
      window.removeEventListener("message", onMessage);
    };

    window.addEventListener("message", onMessage);
  });

  const rejectHandler = new Promise<never>((_, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Timeout"));
      clearTimeout(timer);
    }, PREVIEW_TIMEOUT);
  });

  // eslint-disable-next-line consistent-return
  return Promise.race([resolveHandler, rejectHandler]);
}

export function usePreviewIframe({ inputData, componentId }: Props) {
  const ref = useRef<HTMLIFrameElement>(null);
  const { isPending, data, isError } = useQuery({
    queryFn: getPostMessage,
    queryKey: ["preview-iframe", componentId],
    retry: false,
  });

  const {
    isPending: isReloading,
    mutate,
    isError: isReloadError,
  } = useMutation({
    mutationFn: () => onReloadIframe(ref.current),
    mutationKey: ["preview-iframe", componentId],
    retry: false,
  });

  async function onLoadIframe(
    e: React.SyntheticEvent<HTMLIFrameElement, Event>
  ) {
    if (!e.target) return;

    const { contentWindow } = e.target as HTMLIFrameElement;

    if (!contentWindow) return;

    const message = JSON.stringify(inputData);

    contentWindow.postMessage(message, SANDBOX_URL);
  }

  return {
    onLoadIframe,
    isPending,
    data,
    isError,
    ref,
    isReloading,
    reload: mutate,
    isReloadError,
  };
}
