import Link from "next/link";
import React from "react";
import { FollowButton } from "@/components/elements/follow/follow-button";
import { AvatarLink } from "@/components/elements/users/avatar-link";
import { Button } from "@/components/ui/button";

import { auth } from "@/lib/auth";
import { getIsFollowing } from "@/services/follow/get";

export async function UserInfo({
  creator,
}: {
  creator: { name: string | null; image: string | null; id: string };
}) {
  const session = await auth();
  const isFollowing = await getIsFollowing(session?.user?.id, creator.id);

  return (
    <div className="flex items-center  justify-between gap-4">
      <AvatarLink
        classNames={{
          root: "group",
          name: "group-hover:underline",
        }}
        id={creator.id}
        image={creator.image}
        name={creator.name}
        size="lg"
      />

      {session && session.user ? (
        <FollowButton
          followerId={session.user?.id}
          followingId={creator.id}
          initialFollowed={isFollowing}
        />
      ) : (
        <Button asChild size="sm" variant="outline">
          <Link href="/auth/login">Follow</Link>
        </Button>
      )}
    </div>
  );
}
