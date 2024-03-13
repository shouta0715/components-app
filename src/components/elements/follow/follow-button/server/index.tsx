import "server-only";
import Link from "next/link";
import React from "react";
import { FollowButton } from "@/components/elements/follow/follow-button";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getIsFollowing } from "@/services/follow/get";

export async function ServerSideFollowButton({
  followingId,
}: {
  followingId: string;
}) {
  const session = await auth();
  const isFollowing = await getIsFollowing(session?.user?.id, followingId);

  return session && session.user ? (
    <FollowButton
      followerId={session.user?.id}
      followingId={followingId}
      initialFollowed={isFollowing}
    />
  ) : (
    <Link
      className={buttonVariants({
        size: "sm",
        variant: "outline",
      })}
      href="/auth/login"
      scroll={false}
    >
      フォロー
    </Link>
  );
}
