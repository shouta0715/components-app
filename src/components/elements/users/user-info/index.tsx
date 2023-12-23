import Link from "next/link";
import React from "react";
import { AvatarLink } from "@/components/elements/users/avatar-link";
import { Button } from "@/components/ui/button";

import { auth } from "@/lib/auth";

export async function UserInfo({
  creator,
}: {
  creator: { name: string | null; image: string | null; id: string };
}) {
  const session = await auth();

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

      {session ? null : (
        <Button asChild size="sm" variant="outline">
          <Link href="/auth/login">Follow</Link>
        </Button>
      )}
    </div>
  );
}
