"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import {
  getPostMessage,
  onReloadIframe,
} from "@/components/elements/files/ui-preview/client/fetcher";
import { SANDBOX_URL } from "@/lib/constant";
import { SuccessTransformedData } from "@/scripts/ui-preview/types";

type Props = { inputData: SuccessTransformedData; componentId: string };

export function usePreviewIframe({ inputData, componentId }: Props) {
  const ref = useRef<HTMLIFrameElement>(null);
  const { isPending, data, isError } = useQuery({
    queryFn: getPostMessage,
    queryKey: ["preview-iframe", componentId],
    retry: false,
    gcTime: 0,
    staleTime: 0,
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
