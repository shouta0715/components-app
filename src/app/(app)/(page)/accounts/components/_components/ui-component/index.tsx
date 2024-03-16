import { Extension } from "@prisma/client";
import clsx from "clsx";
import { Eye, Heart, ImageIcon, Lock, LockOpen, Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";
import { MeComponentsCommandItem } from "@/app/(app)/(page)/accounts/components/_components/command";
import { BlockQuoteLogo } from "@/components/icons/blockquote";
import { LangIcons } from "@/components/icons/LangIcons";
import { buttonVariants } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { cn, getImageUrl } from "@/utils";
import { formatDateDistance } from "@/utils/time";

type MeComponentProps = {
  previewUrl: string;
  extensions: { extension: Extension }[];
  name: string;
  id: string;
  updatedAt: Date;
  draft: boolean;
  count: number;
  description: string | null;
  categoryName: string;
};

export function MeComponent({
  previewUrl,
  description,
  extensions,
  name,
  id,
  updatedAt,
  draft,
  count,
  categoryName,
}: MeComponentProps) {
  return (
    <MeComponentsCommandItem
      className="rounded-lg border border-border"
      keywords={[categoryName]}
      value={name ?? "Untitled"}
    >
      <div className="p-4">
        <div className="flex min-w-0 overflow-hidden">
          <div className="size-40 shrink-0 overflow-hidden rounded-lg border border-border  sm:size-48">
            {previewUrl ? (
              <Image
                alt={`Image for ${name || "Untitled"}`}
                className="size-full object-cover object-center"
                height={192}
                src={getImageUrl(previewUrl)}
                width={192}
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-secondary text-muted-foreground">
                <ImageIcon className="size-36" />
              </div>
            )}
          </div>

          <div className="relative ml-6 flex flex-1 flex-col">
            <BlockQuoteLogo className="-top-2 w-24 sm:w-32" />
            <span className=" text-sm capitalize">{categoryName}</span>
            <h3 className="mt-1 line-clamp-1 break-words text-lg font-semibold sm:text-xl">
              {name || "Untitled"}
            </h3>
            <p className="mt-1">
              {description ? (
                <span className="line-clamp-3 text-xs text-muted-foreground">
                  {description}
                </span>
              ) : (
                <span className="text-sm text-muted-foreground">
                  No description
                </span>
              )}
            </p>
            <BlockQuoteLogo className="-bottom-2 right-0 w-24 rotate-180 sm:w-32" />
            <p className="mt-2 flex items-center text-sm text-muted-foreground">
              <time dateTime={updatedAt.toISOString()}>
                {formatDateDistance(updatedAt)}に更新
              </time>
              <span className="ml-2 text-muted-foreground">
                <Heart className="mr-1 inline-block size-4" />
                <span className="">{count}</span>
              </span>
            </p>
            <p className="mt-auto flex items-center text-sm">
              <span
                className={clsx(
                  "inline-flex h-8 items-center rounded-full border px-4 py-1 text-muted-foreground",
                  draft ? "border-border" : "font-semibold text-primary"
                )}
              >
                {draft ? (
                  <Lock className="mr-2 size-4" />
                ) : (
                  <LockOpen className="mr-2 size-4" />
                )}

                {draft ? "下書き" : "公開中"}
              </span>

              {!draft && (
                <Link
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "ml-2 py-1 h-8 text-xs font-semibold rounded-full"
                  )}
                  href={`/components/${id}/quick-view`}
                  scroll={false}
                >
                  <Eye className="mr-2 size-4" />
                  Quick View
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center border-t border-border p-4 text-sm">
        <Link
          className={buttonVariants({
            size: "sm",
            className: "font-semibold mr-4",
          })}
          href={draft ? `/components/${id}/preview` : `/components/${id}`}
        >
          <span>詳細を見る</span>
        </Link>
        <Link
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "sm",
            })
          )}
          href={`/components/${id}/edit`}
        >
          <Pencil className="mr-2 size-4" />
          <span>編集する</span>
        </Link>

        <div className="ml-auto flex items-center">
          {extensions.map(({ extension }) => {
            const Icon = LangIcons[extension];

            return <Icon key={extension} className="size-6" />;
          })}
        </div>
      </div>
    </MeComponentsCommandItem>
  );
}
