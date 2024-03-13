import { LinkIcon } from "lucide-react";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { ServerSideFollowButton } from "@/components/elements/follow/follow-button/server";
import { UIComponent } from "@/components/elements/ui-components";
import { GitHubIcon } from "@/components/icons/GitHub";
import { XIcon } from "@/components/icons/x-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Section } from "@/components/ui/section";
import { getUserPageData } from "@/services/user/get";
import { Params } from "@/types/next";

export default async function Page({ params }: Params) {
  const person = await getUserPageData(params.slug);

  if (!person) notFound();

  const hasComponents = person.components.length > 0;

  return (
    <div className="animate-fade-in space-y-12">
      <div className="flex min-w-0 border-b border-border pb-6">
        <figure className="mr-4 shrink-0">
          <Avatar className="h-24 w-24 rounded-md sm:h-28 sm:w-28">
            <AvatarImage
              className="size-full rounded-md"
              src={person.image || ""}
            />
            <AvatarFallback className="size-full rounded-md">
              {person.name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </figure>
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="flex items-center justify-between space-x-4">
            <p className="line-clamp-1 flex-1 text-lg font-semibold">
              {person.name}
            </p>
            <div>
              <Suspense>
                <ServerSideFollowButton followingId={person.id} />
              </Suspense>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-end space-x-2">
              <p className=" flex items-center text-sm">
                <span className="text-sm text-muted-foreground">
                  <span aria-label="いいね数" className="mr-1">
                    {person.likesCount}
                  </span>
                  いいね
                </span>
              </p>
              <p className="flex items-center text-sm">
                <span className="text-sm text-muted-foreground">
                  <span aria-label="作品数" className="mr-1">
                    {person.components.length}
                  </span>
                  作品
                </span>
              </p>
              <p className="flex items-center text-sm">
                <span className="text-sm text-muted-foreground">
                  <span aria-label="フォロワー数" className="mr-1">
                    {person.followerCount}
                  </span>
                  フォロワー
                </span>
              </p>
            </div>
            <div className="mt-1 space-x-2">
              {person.profile?.website && (
                <a
                  className="text-sm"
                  href={person.profile?.website}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LinkIcon
                    aria-label={`${person.name}のウェブサイト`}
                    className="mr-2 inline-block size-5"
                  />
                  <span
                    aria-label={`${person.name}のウェブサイト`}
                    className="sr-only"
                  >
                    {person.profile?.website}
                  </span>
                </a>
              )}

              {person.profile?.github && (
                <a
                  className="text-sm"
                  href={`https://github.com/${person.profile.github}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <GitHubIcon
                    aria-label={`${person.name}のGitHub`}
                    className="mr-2 inline-block size-5"
                  />
                  <span
                    aria-label={`${person.name}のGitHub`}
                    className="sr-only"
                  >
                    {person.profile?.github}
                  </span>
                </a>
              )}
              {person.profile?.twitter && (
                <a
                  className="text-sm"
                  href={`https://twitter.com/${person.profile?.twitter}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <XIcon
                    aria-label={`${person.name}のTwitter`}
                    className="mr-2 inline-block size-5"
                  />
                  <span
                    aria-label={`${person.name}のTwitter`}
                    className="sr-only"
                  >
                    {person.profile?.twitter}
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <Section.Root>
        <Section>
          <Section.Title>コンポーネント 一覧</Section.Title>
          <Section.Content>
            {hasComponents && (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-y-10">
                {person.components.map((component) => {
                  const creator = {
                    id: person.id,
                    image: person.image,
                    name: person.name,
                  };

                  return (
                    <UIComponent
                      key={component.id}
                      {...component}
                      count={component._count.likes}
                      creator={creator}
                      extensions={component.files}
                      showUser={false}
                    />
                  );
                })}
              </div>
            )}
          </Section.Content>
        </Section>
      </Section.Root>
    </div>
  );
}
