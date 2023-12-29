"use client";

import { FullscreenIcon, RotateCw } from "lucide-react";
import React, { useCallback } from "react";
import { usePreviewIframe } from "@/components/elements/files/ui-preview/client/usePreviewIframe";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { CodeBundlerError } from "@/scripts/ui-preview/errors";
import { SuccessTransformedData } from "@/scripts/ui-preview/types";
import { cn } from "@/utils";

const SANDBOX_URL = process.env.NEXT_PUBLIC_SANDBOX_URL as string;
type PreviewIframeProps = React.PropsWithoutRef<
  JSX.IntrinsicElements["iframe"]
> & {
  inputData: SuccessTransformedData;
  componentId: string;
  name: string;
};

function FrameHeader({
  iframe,
  name,
  reload,
}: {
  iframe: React.RefObject<HTMLIFrameElement>;
  name: string;
  reload: () => void;
}) {
  const onFullscreen = useCallback(() => {
    if (!iframe.current) return;

    iframe.current.requestFullscreen();
  }, [iframe]);

  return (
    <div className="flex items-center gap-x-2 p-2">
      <button onClick={reload} type="button">
        <span className="sr-only">Reload</span>
        <RotateCw size={16} />
      </button>
      <HoverCard openDelay={500}>
        <HoverCardTrigger asChild>
          <button
            aria-label="Toggle Fullscreen"
            className="group flex size-3.5 items-center justify-center rounded-full bg-[#28c840]"
            onClick={onFullscreen}
            type="button"
          >
            <FullscreenIcon
              className="hidden  text-black group-hover:flex"
              size={8}
            />
            <span className="sr-only">Toggle Fullscreen</span>
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          alignOffset={-30}
          asChild
          className="w-max"
          sideOffset={10}
        >
          <button
            className="flex items-center gap-x-2 rounded-md px-2 py-1 text-sm font-semibold "
            onClick={onFullscreen}
            type="button"
          >
            <FullscreenIcon size={24} />
            フルスクリーンにする
          </button>
        </HoverCardContent>
      </HoverCard>
      <p className="ml-2 line-clamp-1 flex-1 text-xs font-semibold text-primary">
        {name}
      </p>
    </div>
  );
}

const PreviewIframe = ({
  inputData,
  componentId,
  className,
  title,
  name,
  ...props
}: PreviewIframeProps) => {
  const {
    onLoadIframe,
    isPending,
    data,
    isError,
    ref,
    reload,
    isReloading,
    isReloadError,
  } = usePreviewIframe({
    inputData,
    componentId,
  });

  const isLoading = isPending || isReloading;

  if (isError || isReloadError) throw new CodeBundlerError();

  return (
    <>
      <FrameHeader iframe={ref} name={name} reload={reload} />
      <iframe
        {...props}
        ref={ref}
        allow="fullscreen"
        className={cn("w-full overflow-hidden", className)}
        onLoad={onLoadIframe}
        sandbox="allow-scripts allow-same-origin"
        src={SANDBOX_URL}
        style={{
          opacity: isLoading ? 0 : 1,
          height: isLoading ? "0px" : data?.height,
        }}
        title={title}
      />
      {isLoading && <Skeleton className="h-96 w-full rounded-md border" />}
    </>
  );
};

export { PreviewIframe };
