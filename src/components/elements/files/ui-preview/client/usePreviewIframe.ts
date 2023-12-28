"use client";

import { useQuery } from "@tanstack/react-query";
import { TransformedFile } from "@/scripts/ui-preview/types";

type Props = { files: TransformedFile[]; componentId: string };

const SANDBOX_URL = process.env.NEXT_PUBLIC_SANDBOX_URL as string;

type ResolveData = {
  height: number;
};

async function getPostMessage() {
  return new Promise<ResolveData>((resolve) => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== SANDBOX_URL) return;

      const data = JSON.parse(e.data) as ResolveData;
      resolve(data);
      window.removeEventListener("message", onMessage);
    };

    window.addEventListener("message", onMessage);
  });
}

export function usePreviewIframe({ files, componentId }: Props) {
  async function onLoadIframe(
    e: React.SyntheticEvent<HTMLIFrameElement, Event>
  ) {
    if (!e.target) return;

    const { contentWindow } = e.target as HTMLIFrameElement;

    if (!contentWindow) return;
    const message = JSON.stringify(files);

    contentWindow.postMessage(message, SANDBOX_URL);
  }

  const { isPending, data } = useQuery({
    queryFn: getPostMessage,
    queryKey: ["preview-iframe", componentId],
  });

  return {
    onLoadIframe,
    isPending,
    data,
  };
}
