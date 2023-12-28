"use client";

import React from "react";
import { usePreviewIframe } from "@/components/elements/files/ui-preview/client/usePreviewIframe";
import { Skeleton } from "@/components/ui/skeleton";
import { TransformedFile } from "@/scripts/ui-preview/types";
import { cn } from "@/utils";

const SANDBOX_URL = process.env.NEXT_PUBLIC_SANDBOX_URL as string;
type PreviewIframeProps = React.PropsWithoutRef<
  JSX.IntrinsicElements["iframe"]
> & {
  files: TransformedFile[];
  componentId: string;
};

const PreviewIframe = ({
  files,
  componentId,
  className,
  title,
  ...props
}: PreviewIframeProps) => {
  const { onLoadIframe, isPending, data } = usePreviewIframe({
    files,
    componentId,
  });

  return (
    <>
      <iframe
        {...props}
        className={cn("h-[800px] w-full rounded-md border", className)}
        onLoad={onLoadIframe}
        sandbox="allow-scripts allow-same-origin"
        src={SANDBOX_URL}
        style={{
          opacity: isPending ? 0 : 1,
          height: isPending ? "0px" : data?.height,
        }}
        title={title}
      />
      {isPending && <Skeleton className="h-[800px] w-full rounded-md border" />}
    </>
  );
};

export { PreviewIframe };
