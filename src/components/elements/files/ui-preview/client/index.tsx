"use client";

import React from "react";
import { usePreviewIframe } from "@/components/elements/files/ui-preview/client/usePreviewIframe";
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
};

const PreviewIframe = ({
  inputData,
  componentId,
  className,
  title,
  ...props
}: PreviewIframeProps) => {
  const { onLoadIframe, isPending, data, isError } = usePreviewIframe({
    inputData,
    componentId,
  });

  if (isError) throw new CodeBundlerError();

  return (
    <>
      <iframe
        {...props}
        className={cn(
          "w-full rounded-md border ring-1 overflow-hidden",
          className
        )}
        onLoad={onLoadIframe}
        sandbox="allow-scripts allow-same-origin"
        src={SANDBOX_URL}
        style={{
          opacity: isPending ? 0 : 1,
          height: isPending ? "0px" : data?.height,
        }}
        title={title}
      />
      {isPending && <Skeleton className="h-96 w-full rounded-md border" />}
    </>
  );
};

export { PreviewIframe };
