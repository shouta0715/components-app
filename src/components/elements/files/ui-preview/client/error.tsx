"use client";

import { AlertCircle, MinusIcon, PlusIcon, RotateCw } from "lucide-react";
import { useState } from "react";
import { FallbackProps } from "react-error-boundary";
import { PostMessageError } from "@/components/elements/files/ui-preview/error/errors";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ModuleError } from "@/scripts/ui-preview/errors";

type UIPreviewErrorProps = FallbackProps;

function getErrorMessage(error: unknown) {
  if (error instanceof ModuleError)
    return "コードにエラーがある可能性があります。";

  if (error instanceof PostMessageError) {
    switch (error.module) {
      case "TimeOut":
        return "タイムアウトエラーです。重いコードを使用している可能性があります。";

      case "Render":
        return "コードにエラーが有る可能性があります。";

      case "Reload":
        return "プレビューをリロードできませんでした。";
      default:
        return "予期しないエラーが発生しました。";
    }
  }

  return "予期しないエラーが発生しました。";
}

export function UIPreviewError({
  error,
  resetErrorBoundary,
}: UIPreviewErrorProps) {
  const [collapsible, setCollapsible] = useState(true);

  return (
    <Collapsible defaultOpen onOpenChange={setCollapsible} open={collapsible}>
      <div className="grid overflow-hidden rounded-md border border-border">
        <div className="flex items-center gap-2 border-b border-border p-4">
          <button onClick={resetErrorBoundary} type="button">
            <RotateCw size={16}>
              <span className="sr-only">プレビューをリロードする</span>
            </RotateCw>
          </button>
          <CollapsibleTrigger
            aria-label="Toggle Fullscreen"
            className="group flex size-3.5 items-center justify-center rounded-full bg-[#febc2e] disabled:animate-pulse disabled:cursor-not-allowed"
          >
            {collapsible ? (
              <>
                <MinusIcon
                  className="hidden text-black  group-hover:flex group-disabled:hidden"
                  size={8}
                />
                <span className="sr-only">エラーメッセージを最小化する</span>
              </>
            ) : (
              <>
                <PlusIcon
                  className="hidden text-black  group-hover:flex group-disabled:hidden"
                  size={8}
                />
                <span className="sr-only">エラーメッセージを最大化する。</span>
              </>
            )}
          </CollapsibleTrigger>
          <p className="ml-2 line-clamp-1 flex-1 text-xs font-semibold text-primary">
            プレビューをロードできませんでした。
          </p>
        </div>
        <CollapsibleContent>
          <div className="flex flex-col items-center gap-4 px-4 py-10">
            <div className="grid flex-1 gap-4">
              <AlertCircle className="mx-auto size-16 text-destructive" />
              <p className="text-center text-xs text-destructive" role="alert">
                プレビューをロードできませんでした。
              </p>
            </div>

            <p
              className="grid gap-2 text-center text-xs text-muted-foreground"
              role="alert"
            >
              <span>{getErrorMessage(error)}</span>
              <span>
                使用する場合は、コードを確認の上、注意をして使用してください。
              </span>
            </p>
            <Button
              onClick={resetErrorBoundary}
              size="sm"
              type="button"
              variant="secondary"
            >
              リロードする
            </Button>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
