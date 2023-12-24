"use client";

import React from "react";

import {
  FollowButtonProps,
  useFollowButton,
} from "@/components/elements/follow/follow-button/useFollowButton";
import { Button } from "@/components/ui/button";

export function FollowButton(props: FollowButtonProps) {
  const { onDebounceFollow, followed } = useFollowButton(props);

  return (
    <Button
      className="w-24"
      onClick={onDebounceFollow}
      size="sm"
      variant={followed ? "outline" : "default"}
    >
      {followed ? "フォロー中" : "フォロー"}
    </Button>
  );
}
