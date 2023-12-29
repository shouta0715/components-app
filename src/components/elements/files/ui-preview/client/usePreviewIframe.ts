"use client";

import { useQuery } from "@tanstack/react-query";
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
    setTimeout(() => {
      reject(new Error("Timeout"));
    }, 10000);
  });

  return Promise.race([resolveHandler, rejectHandler]);
}

export function usePreviewIframe({ inputData, componentId }: Props) {
  async function onLoadIframe(
    e: React.SyntheticEvent<HTMLIFrameElement, Event>
  ) {
    if (!e.target) return;

    const { contentWindow } = e.target as HTMLIFrameElement;

    if (!contentWindow) return;
    const message = JSON.stringify(inputData);

    contentWindow.postMessage(message, SANDBOX_URL);
  }

  const { isPending, data, isError } = useQuery({
    queryFn: getPostMessage,
    queryKey: ["preview-iframe", componentId],
    retry: false,
  });

  return {
    onLoadIframe,
    isPending,
    data,
    isError,
  };
}
