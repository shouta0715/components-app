"use client";

import clsx from "clsx";
import { HeartIcon } from "lucide-react";
import React from "react";

import {
  UseLikeButtonProps,
  useLikeButton,
} from "@/components/elements/likes/like-button/use-like-button";
import { Button, ButtonProps } from "@/components/ui/button";

type LikeButtonProps = UseLikeButtonProps &
  Omit<ButtonProps, "onClick"> & {
    viewCount?: boolean;
  };

export function LikeButton({
  initialLiked,
  initialCount,
  viewCount = true,
  ...props
}: LikeButtonProps) {
  const { handleLike, currentLikeState } = useLikeButton({
    initialLiked,
    initialCount,
  });

  return (
    <>
      <Button
        onClick={handleLike}
        radius="full"
        size="icon"
        variant="outline"
        {...props}
      >
        <span className="sr-only">
          {currentLikeState.liked ? "いいねを取り消す" : "いいねをする"}
        </span>
        <HeartIcon
          className={clsx(
            "size-6",
            currentLikeState.liked ? "fill-pink-600 text-pink-600" : ""
          )}
        />
      </Button>
      {viewCount && (
        <span className="ml-2 tabular-nums">{currentLikeState.count}</span>
      )}
    </>
  );
}
