import { Extension, User } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";
import { LangIcons } from "@/components/icons/LangIcons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { getImageUrl } from "@/utils";
import { formatDateDistance } from "@/utils/time";

type UIComponentProps = {
  count: number;
  id: string;
  name: string;
  previewUrl: string;
  creator: Pick<User, "id" | "name" | "image">;
  createdAt: Date;
  extensions: { extension: Extension }[];
  showUser?: boolean;
};

function HeaderImage({
  previewUrl,
  name,
  id,
}: {
  previewUrl: string;
  name: string;
  id: string;
}) {
  return (
    <div className="group relative h-52 overflow-hidden">
      <Link
        className="absolute inset-0 block hover:bg-accent/20"
        href={`/components/${id}`}
      >
        <span className="sr-only">{name}の詳細を見る</span>
      </Link>

      <Image
        alt={`Image for ${name}`}
        className="h-auto w-full object-cover"
        height={200}
        priority
        quality={70}
        src={`${getImageUrl(previewUrl)}`}
        width={400}
      />
      <div className="absolute bottom-4 z-10 flex w-full justify-center px-4 opacity-0 transition-opacity group-hover:opacity-100">
        <Link
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className:
              "border border-border w-full bg-background/80 font-semibold px-6",
          })}
          href={`/components/${id}/quick-view`}
          scroll={false}
        >
          Quick View
        </Link>
      </div>
    </div>
  );
}

function UserInformation({
  userId,
  image,
  createdAt,
  count,
  name,
}: {
  userId: string;
  image: string | null;
  createdAt: Date;
  count: number;
  name: string | null;
}) {
  return (
    <div className="mt-2 flex items-center">
      <Link className="flex items-center gap-2" href={`/users/${userId}`}>
        <Avatar className="rounded-md">
          <AvatarImage
            alt={name ?? "ユーザーのアバター"}
            className="rounded-md"
            src={image ?? ""}
          />
          <AvatarFallback className="rounded-md">
            {name?.slice(0, 2) ?? "UK"}
          </AvatarFallback>
        </Avatar>
      </Link>
      <div className="ml-2 flex-1">
        <Link
          className="line-clamp-1 text-sm font-medium underline-offset-2 hover:underline"
          href={`/users/${userId}`}
        >
          {name}
        </Link>
        <p className="text-xs text-muted-foreground">
          <time
            dateTime={createdAt.toISOString()}
            title={createdAt.toISOString()}
          >
            {formatDateDistance(createdAt)}
          </time>
          <span className="ml-2">
            <HeartIcon className="inline-block size-4" />
            <span className="ml-1">{count}</span>
          </span>
        </p>
      </div>
    </div>
  );
}

export function UIComponent({
  count,
  id,
  name,
  previewUrl,
  creator,
  createdAt,
  extensions,
  showUser = true,
}: UIComponentProps) {
  const exs = useMemo(() => {
    return [...new Set(extensions.map((e) => e.extension))];
  }, [extensions]);

  return (
    <article
      key={id}
      className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow"
    >
      <HeaderImage id={id} name={name} previewUrl={previewUrl} />

      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="line-clamp-1 flex-1 font-semibold">{name}</h3>
          <Link
            className="ml-2 mt-1 h-max shrink-0 text-xs underline underline-offset-4"
            href={`/components/${id}/quick-view`}
            scroll={false}
          >
            Quick View
          </Link>
        </div>

        {showUser ? (
          <UserInformation
            count={count}
            createdAt={createdAt}
            image={creator.image}
            name={creator.name}
            userId={creator.id}
          />
        ) : (
          <div className="-mb-2 mt-4 flex items-center">
            <p className="text-xs text-muted-foreground">
              <time
                dateTime={createdAt.toISOString()}
                title={createdAt.toISOString()}
              >
                {formatDateDistance(createdAt)}
              </time>
              <span className="ml-2">
                <HeartIcon className="inline-block size-4" />
                <span className="ml-1">{count}</span>
              </span>
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <Link
            className={buttonVariants({
              size: "sm",
              className: "h-auto py-2 text-xs font-semibold transition-all",
            })}
            href={`/components/${id}`}
          >
            詳しく見る
          </Link>

          <div className="flex gap-x-2">
            {exs.map((e) => {
              const Icons = LangIcons[e];

              return <Icons key={e} className="size-6" />;
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
