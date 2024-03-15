import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import { Params } from "@/types/next";

export type UseLikeButtonProps = {
  initialLiked: boolean;
  initialCount: number;
};

type FetchLikeProps = {
  trigger: "like" | "unlike";
  componentId: string;
};

export async function fetchLike({ trigger, componentId }: FetchLikeProps) {
  const result = await fetch(`/api/components/${componentId}/likes`, {
    method: trigger === "like" ? "POST" : "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!result.ok) throw new Error("エラーが発生しました。");

  return result.json() as Promise<{ message: string; liked: boolean }>;
}

type GetNewLikeCountProps = {
  initialCount: number;
  initialLiked: boolean;
  liked: boolean;
};
function getNextLikeCount({
  initialCount,
  liked,
  initialLiked,
}: GetNewLikeCountProps) {
  const nextCount = liked ? initialCount + 1 : initialCount - 1;

  if (initialLiked && nextCount > initialCount) {
    return initialCount;
  }

  if (!initialLiked && nextCount < initialCount) {
    return initialCount;
  }

  return nextCount < 0 ? 0 : nextCount;
}

export function useLikeButton({
  initialLiked,
  initialCount,
}: UseLikeButtonProps) {
  const { slug } = useParams<Params["params"]>();

  const [currentLikeState, setCurrentLikeState] = useState({
    liked: initialLiked,
    count: initialCount,
  });

  const realityLiked = useRef({ liked: initialLiked, count: initialCount });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: fetchLike,
    onSuccess: ({ liked }) => {
      realityLiked.current.liked = liked;
      realityLiked.current.count = getNextLikeCount({
        initialCount,
        liked,
        initialLiked,
      });
      setCurrentLikeState(realityLiked.current);
    },
    onError: () => {
      const message = initialLiked
        ? "いいねを取り消せませんでした。"
        : "いいねできませんでした。";
      toast.error(message, {
        description: "再度時間をおいてお試しください。",
      });
      setCurrentLikeState(realityLiked.current);
    },
  });

  const onDebounceLike = useDebouncedCallback(async () => {
    if (isPending) return;

    if (realityLiked.current.liked === currentLikeState.liked) return;

    const trigger = currentLikeState.liked ? "like" : "unlike";

    await mutateAsync({ trigger, componentId: slug });
  }, 500);

  const handleLike = () => {
    setCurrentLikeState((prev) => ({
      liked: !prev.liked,
      count: prev.liked ? prev.count - 1 : prev.count + 1,
    }));

    onDebounceLike();
  };

  return {
    currentLikeState,
    handleLike,
  };
}
