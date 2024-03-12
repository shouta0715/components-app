import clsx from "clsx";
import { FileCode2, Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

import { BuildTimeBadge } from "@/components/elements/badges/build-time";
import { RankingIcon } from "@/components/icons/ranking";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { getRankingUsers } from "@/services/user/get/ranking";
import { getBuildDate } from "@/utils/time/build-date";

export const dynamic = "error";

const buildDate = getBuildDate();

export default async function Page() {
  const people = await getRankingUsers(10);

  const hasPeople = people.length > 0;

  return (
    <Section.Root>
      <Section>
        <div>
          <Section.Title className="flex items-center justify-between">
            ユーザーランキング
            <BuildTimeBadge date={buildDate} />
          </Section.Title>
          <Section.Description className="mt-2 text-sm">
            いいねの数が多いユーザーをランキングで表示しています。
          </Section.Description>
        </div>
        <Section.Content>
          {hasPeople ? (
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-y-10">
              {people.map((person, i) => {
                return (
                  <li
                    key={person.id}
                    className="relative h-full overflow-hidden rounded-xl bg-primary shadow-xl"
                  >
                    {i < 3 && (
                      <RankingIcon
                        className={clsx(
                          "absolute -left-4 z-10",
                          i === 0 && "fill-gold",
                          i === 1 && "fill-silver",
                          i === 2 && "fill-bronze"
                        )}
                        text={i + 1}
                      />
                    )}
                    <div key={person.name} className="rounded-2xl px-8 py-10">
                      <Avatar className="mx-auto h-36 w-36 rounded-full sm:h-48 sm:w-48">
                        <AvatarImage
                          alt={`${person.name ?? "User"}のアイコン`}
                          src={person.image ?? ""}
                        />
                        <AvatarFallback className="text-2xl font-bold sm:text-3xl">
                          {person.name?.slice(0, 8) ?? "UK"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-background">
                        <h3 className="mt-6 line-clamp-1 text-center text-base font-semibold leading-7 tracking-tight">
                          {person.name}
                        </h3>
                        <div className="mt-2 flex justify-center space-x-4">
                          <p className="text-center">
                            <Heart className="mr-2 inline-block size-6" />
                            <span className="text-sm font-semibold">
                              {person.likes_count}
                            </span>
                          </p>
                          <p className="text-center">
                            <FileCode2 className="mr-2 inline-block size-6" />
                            <span className="text-sm font-semibold">
                              {person.component_count}
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="z-30 flex justify-center ">
                        <Link
                          className={buttonVariants({
                            className: "mt-4  font-semibold",
                            variant: "secondary",
                          })}
                          href={`/users/${person.id}`}
                        >
                          このユーザーの投稿を見る
                        </Link>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </Section.Content>
      </Section>
    </Section.Root>
  );
}
