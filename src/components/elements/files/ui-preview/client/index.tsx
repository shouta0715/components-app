"use client";

import clsx from "clsx";
import {
  FullscreenIcon,
  Loader,
  MinusIcon,
  PlusIcon,
  RotateCw,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import { usePreviewIframe } from "@/components/elements/files/ui-preview/client/usePreviewIframe";
import { FrameLoading } from "@/components/elements/files/ui-preview/server/loading";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SANDBOX_URL } from "@/lib/constant";
import { SuccessTransformedData } from "@/scripts/ui-preview/types";
import { cn } from "@/utils";

type PreviewIframeProps = React.PropsWithoutRef<
  JSX.IntrinsicElements["iframe"]
> & {
  inputData: SuccessTransformedData;
  name: string;
};

function FrameHeader({
  iframe,
  name,
  reload,
  isLoading,
  collapsible,
}: {
  iframe: React.RefObject<HTMLIFrameElement>;
  name: string;
  reload: () => void;
  isLoading: boolean;
  collapsible: boolean;
}) {
  const onFullscreen = useCallback(() => {
    if (!iframe.current) return;

    iframe.current.requestFullscreen();
  }, [iframe]);

  return (
    <div className=" flex items-center gap-2 border-b border-border p-4">
      <button
        className="disabled:cursor-not-allowed"
        disabled={isLoading}
        onClick={reload}
        type="button"
      >
        <span className="sr-only">
          {isLoading
            ? "プレビューをロード中です。しばらくお待ちください。"
            : "プレビューをリロードする"}
        </span>
        {isLoading ? (
          <Loader className="animate-spin" size={16} />
        ) : (
          <RotateCw size={16} />
        )}
      </button>
      <CollapsibleTrigger
        aria-label="Toggle Fullscreen"
        className="group flex size-3.5 items-center justify-center rounded-full bg-[#febc2e] disabled:animate-pulse disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {collapsible ? (
          <>
            <MinusIcon
              className="hidden text-black  group-hover:flex group-disabled:hidden"
              size={8}
            />
            <span className="sr-only">
              {isLoading
                ? "プレビューをロード中です。しばらくお待ちください。"
                : `${name}のプレビューを最小化する`}
            </span>
          </>
        ) : (
          <>
            <PlusIcon
              className="hidden text-black  group-hover:flex group-disabled:hidden"
              size={8}
            />
            <span className="sr-only">
              {isLoading
                ? "プレビューをロード中です。しばらくお待ちください。"
                : `${name}のプレビューを最大化する`}
            </span>
          </>
        )}
      </CollapsibleTrigger>
      <HoverCard openDelay={500}>
        <HoverCardTrigger asChild>
          <button
            aria-label="Toggle Fullscreen"
            className="group flex size-3.5 items-center justify-center rounded-full bg-[#28c840] disabled:animate-pulse disabled:cursor-not-allowed"
            disabled={isLoading}
            onClick={onFullscreen}
            type="button"
          >
            <FullscreenIcon
              className="hidden  text-black group-hover:flex group-disabled:hidden"
              size={8}
            />
            <span className="sr-only">Toggle Fullscreen</span>
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          alignOffset={-30}
          asChild
          className="w-auto p-2"
          sideOffset={10}
        >
          <button
            className="flex items-center gap-x-2 rounded-md bg-card text-xs text-muted-foreground hover:bg-accent disabled:cursor-not-allowed"
            disabled={isLoading}
            onClick={onFullscreen}
            type="button"
          >
            <FullscreenIcon className="h-4 w-4 text-muted-foreground " />
            {isLoading ? "ロード中です..." : "全画面表示"}
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
  className,
  title,
  name,
  ...props
}: PreviewIframeProps) => {
  const { onLoadIframe, ref, reload, isPending, height, error } =
    usePreviewIframe({
      inputData,
    });

  if (error) throw error;

  const [collapsible, setCollapsible] = useState(true);

  return (
    <Collapsible
      className="grid overflow-hidden rounded-md border border-border"
      defaultOpen
      onOpenChange={setCollapsible}
      open={collapsible}
    >
      <FrameHeader
        collapsible={collapsible}
        iframe={ref}
        isLoading={isPending}
        name={name}
        reload={reload}
      />
      <CollapsibleContent
        className={clsx(
          "relative overflow-hidden",
          collapsible ? "" : "max-h-44"
        )}
        forceMount
      >
        <iframe
          {...props}
          ref={ref}
          allow="fullscreen"
          className={cn("w-full overflow-hidden rounded-md", className)}
          onLoad={onLoadIframe}
          sandbox="allow-scripts allow-same-origin"
          src={SANDBOX_URL}
          style={{
            opacity: isPending ? 0 : 1,
            height: isPending ? "0px" : height,
          }}
          title={title}
        />
        {!collapsible && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-primary/60">
            <Button onClick={() => setCollapsible(true)} variant="secondary">
              全体を表示
            </Button>
          </div>
        )}
        {isPending && <FrameLoading />}
      </CollapsibleContent>
    </Collapsible>
  );
};

export { PreviewIframe };
