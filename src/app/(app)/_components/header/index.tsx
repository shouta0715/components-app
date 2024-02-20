import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { createDraftComp } from "@/actions/components/create";
import { AvatarLink } from "@/components/elements/users/avatar-link";
import { AuthForm } from "@/components/ui/auth-form";
import { Button, buttonVariants } from "@/components/ui/button";

import { Carousel, CarouselSlider } from "@/components/ui/carousel";
import { Image } from "@/components/ui/image";
import { cache } from "@/lib/next/cache";
import { getTopComps } from "@/services/components/get";
import { cn, getImageUrl } from "@/utils";

async function TopComponent() {
  const components = await cache(async () => getTopComps(5), ["topComps"])();

  return (
    <div className="h-72 w-full">
      <Carousel
        arrow
        autoplay
        autoplayOptions={{
          delay: 4000,
          stopOnMouseEnter: true,
        }}
        classNames={{
          root: "h-full",
          container: "w-full h-full grid",
          viewport: "overflow-hidden h-full",
        }}
        dots
      >
        {components.map((comp) => {
          return (
            <CarouselSlider
              key={comp.previewUrl}
              className="group"
              href={`/components/${comp.id}`}
            >
              <div className="relative h-full w-full items-end justify-end">
                <div
                  aria-hidden
                  className="absolute z-10 h-full w-full [backgroundImage:linear-gradient(180deg,transparent_0_30%,hsl(var(--background))_85%_100%)]"
                />
                <Image
                  alt={comp.name}
                  className="rounded-lg from-transparent object-cover object-top "
                  fill
                  priority
                  sizes="100%"
                  src={getImageUrl(comp.previewUrl)}
                />

                <div className="absolute bottom-6 left-2 z-20 grid gap-1">
                  <AvatarLink
                    id={comp.creator.id}
                    image={comp.creator.image}
                    name={comp.creator.name}
                  />
                  <p className="px-1 text-xs text-primary sm:text-sm">
                    {comp.name}
                  </p>
                </div>
              </div>
            </CarouselSlider>
          );
        })}
      </Carousel>
    </div>
  );
}

export async function TopHeader() {
  return (
    <div className="mb-20 grid gap-8">
      <div className=" grid max-w-md gap-4">
        <h1 className="flex items-center gap-4 text-6xl font-bold text-primary sm:text-7xl">
          UI TRADE
        </h1>
        <p className="grid gap-2 leading-7 text-muted-foreground sm:text-lg">
          <span className="block">
            コンポーネントやUIをシェアするプラットフォーム。
          </span>
          他の開発者が作成したUIを使って、デザインを勉強、開発を加速させましょう。
          <span className="block">
            あなたの作ったUIが世界中の開発者に使われるかもしれません。
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild className="font-bold">
          <Link href="/components/popular">
            人気のコンポーネントを見る
            <ChevronRightIcon className="ml-2 hidden h-5 w-5 sm:inline-block" />
          </Link>
        </Button>
        <AuthForm
          action={createDraftComp}
          className={cn(
            buttonVariants({
              variant: "outline",
              className: "font-bold",
            }),
            "px-0 py-0"
          )}
        >
          <button
            className="flex w-full items-center justify-center px-4 py-2 text-center"
            type="submit"
          >
            投稿する
            <ChevronRightIcon className="ml-2 hidden h-5 w-5 sm:inline-block" />
          </button>
        </AuthForm>
      </div>

      <TopComponent />
    </div>
  );
}
