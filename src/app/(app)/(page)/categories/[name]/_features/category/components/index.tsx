import { Lightbulb, Milestone, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getCountLabel } from "@/app/(app)/(page)/categories/[name]/_features/category/utils";
import { CreateComponentButton } from "@/components/elements/ui-components/create-button";
import { AvatarLink } from "@/components/elements/users/avatar-link";
import { BlockQuoteLogo } from "@/components/icons/blockquote";
import { Image } from "@/components/ui/image";
import { getCategoryByName } from "@/services/category/get/by-name";
import { getImageUrl } from "@/utils";

type CategoryComponentProps = {
  data: NonNullable<Awaited<ReturnType<typeof getCategoryByName>>>;
};

function ComponentImage({
  previewUrl,
  name,
  componentId,
}: Pick<
  CategoryComponentProps["data"],
  "previewUrl" | "name" | "componentId"
>) {
  const canImage = previewUrl && componentId;

  return canImage ? (
    <Link
      className="group relative block h-40  w-full overflow-hidden rounded-3xl sm:h-60"
      href={`/components/${componentId}`}
    >
      <span className="sr-only">{name}の1番人気のコンポーネント</span>
      <span
        aria-hidden
        className="absolute inset-0 z-10 transition-colors duration-300 group-hover:bg-accent/30"
      />

      <Image
        alt={`${name}の1番人気のコンポーネント`}
        fill
        priority
        sizes="(min-width: 640px) 240px, 160px"
        src={getImageUrl(previewUrl)}
      />
    </Link>
  ) : (
    <div className="flex h-40 w-full justify-center overflow-hidden rounded-3xl pb-4">
      <Lightbulb className="size-full" />
    </div>
  );
}

function ComponentFigcaption({
  creator,
}: Pick<CategoryComponentProps["data"], "creator">) {
  return creator ? (
    <figcaption>
      <span className="text-xs text-muted-foreground">
        <Sparkles className="-mt-1 mb-1 mr-1 inline-block size-4 fill-yellow-500 text-yellow-500" />
        No.1 Component By
      </span>
      <AvatarLink
        classNames={{
          root: "group",
          name: "line-clamp-1  text-primary break-all group-hover:underline",
        }}
        id={creator.id}
        image={creator.image}
        name={creator.name}
      />
    </figcaption>
  ) : (
    <p className="mt-2 text-xs text-muted-foreground">
      <Sparkles className="-mt-1 mb-1 mr-1 inline-block size-4 fill-yellow-500 text-yellow-500" />
      1番乗りでコンポーネントを投稿しましょう。
    </p>
  );
}

export function CategoryInfo({ data }: CategoryComponentProps) {
  return (
    <div className="flex gap-8 border-b pb-4">
      <figure className="w-40 shrink-0 sm:w-60">
        <ComponentImage {...data} />
        <ComponentFigcaption {...data} />
      </figure>

      <div className="relative flex flex-1 flex-col">
        <div className="flex-1">
          <BlockQuoteLogo className="-top-2 w-24 sm:w-32" />
          <h1 className="line-clamp-2 w-full whitespace-pre-wrap break-words text-3xl font-bold capitalize text-primary sm:text-4xl">
            {data.name}
          </h1>
          <p className="mt-4 line-clamp-4 text-sm text-muted-foreground">
            {data.description}
          </p>
          <BlockQuoteLogo className="-bottom-2 right-0 w-24 rotate-180 sm:w-32" />
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-2 overflow-hidden md:flex-row">
          <CreateComponentButton
            className="w-full text-xs md:w-auto"
            initialValues={{
              categoryName: data.name,
            }}
            size="sm"
          >
            このカテゴリーを投稿する
          </CreateComponentButton>

          <div className="isolate shrink-0 self-end md:self-auto">
            <span className="relative inline-flex items-center gap-x-1.5 rounded-l-md px-3 font-semibold">
              <Milestone className="size-5" />
              <span className="px-1">{getCountLabel(data.count)}</span>
              Component
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
