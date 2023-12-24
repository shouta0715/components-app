import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

import { FollowSchema } from "@/lib/schema/server/follow";

export type FollowButtonProps = {
  initialFollowed: boolean;
  followerId: string;
  followingId: string;
};

export async function follow({
  followerId,
  followingId,
  trigger,
}: FollowSchema) {
  const result = await fetch("/api/follows", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ followerId, followingId, trigger }),
  });

  if (!result.ok) {
    throw new Error("フォローできませんでした。");
  }

  return result.json() as Promise<{ message: string; followed: boolean }>;
}

export function useFollowButton({
  initialFollowed,
  followerId,
  followingId,
}: FollowButtonProps) {
  const [followed, setFollowed] = useState(initialFollowed);

  const realityFollowed = useRef(initialFollowed);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: follow,
    onSuccess({ followed: newValue }) {
      setFollowed(newValue);
      realityFollowed.current = newValue;
    },
    onError: () => {
      realityFollowed.current = followed;
      setFollowed(realityFollowed.current || initialFollowed);
      toast.error("フォローできませんでした。", {
        description: "再度時間をおいてお試しください。",
      });
    },
    retry: false,
  });

  const onFollow = useDebouncedCallback(async () => {
    if (followerId === followingId || isPending) return;

    if (realityFollowed.current === followed) return;

    const trigger = followed ? "follow" : "unfollow";

    await mutateAsync({ followerId, followingId, trigger });
  }, 500);

  const onDebounceFollow = useCallback(() => {
    setFollowed((p) => !p);
    onFollow();
  }, [onFollow]);

  return { onDebounceFollow, followed };
}
