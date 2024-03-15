import { notFound } from "next/navigation";
import React from "react";
import { ComponentDocument } from "@/components/elements/documents/component-document";
import { FilePreviews } from "@/components/elements/files/file-previe";
import { ServerSideLikeButton } from "@/components/elements/likes/like-button/server";
import { ProfileButton } from "@/components/elements/users/profile-button";
import { UserInfo } from "@/components/elements/users/user-info";
import { Link } from "@/components/ui/link";

import { getPreviewComponent } from "@/services/components/get/previews";
import { getFiles } from "@/services/files/get";
import { Params } from "@/types/next";

export default async function Page({ params }: Params) {
  const component = await getPreviewComponent(params.slug);

  if (component === null || component.draft) notFound();

  return (
    <div className="grid animate-fade-in gap-8">
      <div>
        <p className="font-semibold leading-7 text-muted-foreground">
          <Link className="px-0 text-current sm:text-base" href="/categories">
            Categories
          </Link>
          <span className="px-2">/</span>
          <Link
            className="px-0 capitalize text-current sm:text-base"
            href={`/categories/${component.category.name}`}
          >
            {component.category.name}
          </Link>
        </p>
        <h1 className="text-2xl font-bold text-primary sm:text-3xl">
          {component.name}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          <time dateTime={component.createdAt.toString()}>
            {new Date(component.createdAt).toLocaleDateString()}に作成
          </time>
        </p>
      </div>
      {/* Main Component Preview and User Info */}
      <div className="grid flex-1 gap-8">
        <UserInfo creator={component.creator} />

        <FilePreviews
          functionNames={component.functionName || undefined}
          getObject={async () => getFiles(component.files)}
          name={component.name}
        />

        <ComponentDocument>{component.document}</ComponentDocument>
        <div className=" space-y-6 border-t py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ServerSideLikeButton
                componentId={component.id}
                initialCount={component._count.likes}
              />
            </div>
            <div className="space-x-2">
              <ProfileButton
                name={component.creator.name}
                profile={component.creator.profile}
              />
            </div>
          </div>
          <UserInfo creator={component.creator} />
        </div>
      </div>
    </div>
  );
}
