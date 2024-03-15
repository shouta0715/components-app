import "server-only";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { LikeButton } from "@/components/elements/likes/like-button";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getIsLiked } from "@/services/likes/get";
import { cn } from "@/utils";

export async function ServerSideLikeButton({
  componentId,
  initialCount,
  viewCount = true,
}: {
  componentId: string;
  initialCount: number;
  viewCount?: boolean;
}) {
  const session = await auth();
  const liked = await getIsLiked(componentId, session?.user?.id);

  return session && session.user ? (
    <LikeButton initialCount={initialCount} initialLiked={liked} />
  ) : (
    <>
      <Link
        className={cn(
          buttonVariants({
            size: "icon",
            variant: "outline",
            radius: "full",
          }),
          "rounded-full"
        )}
        href="/auth/login"
        scroll={false}
      >
        <span className="sr-only">ログインしていいねをする</span>
        <HeartIcon className="size-6" />
      </Link>
      {viewCount && <span className="ml-2 tabular-nums">{initialCount}</span>}
    </>
  );
}
