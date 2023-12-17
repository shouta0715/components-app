import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Image } from "@/components/elements/images";
import { Button } from "@/components/ui/button";

import { Carousel, CarouselSlider } from "@/components/ui/carousel";
import { cache } from "@/lib/next/cache";
import { getTopComps } from "@/services/components/get";
import { getImageUrl } from "@/utils";

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
          container: "w-full h-full",
          viewport: "overflow-hidden h-full",
        }}
        dots
      >
        {components.map((comp) => {
          const image = comp.previewImages?.[0];

          return (
            <CarouselSlider
              key={image?.id}
              className="group basis-2/3 sm:basis-1/2"
              href={`/components/${comp.id}`}
            >
              <div className="absolute z-10 h-full w-full opacity-100 transition-opacity duration-500 [backgroundImage:linear-gradient(180deg,transparent_0_30%,hsl(var(--background))_95%_100%)] group-hover:opacity-0" />
              <Image
                alt={comp.name}
                className="scale-90 rounded-lg object-cover object-top"
                fill
                loading="lazy"
                sizes="100%"
                src={getImageUrl(image?.objectId as string)}
              />
            </CarouselSlider>
          );
        })}
      </Carousel>
    </div>
  );
}

export async function TopHeader() {
  return (
    <div className="mb-20 grid gap-4">
      <div className=" grid max-w-md gap-4">
        <h1 className="text-4xl font-bold  text-primary sm:text-7xl">
          UI TRADE
        </h1>
        <p className="leading-7 text-muted-foreground sm:text-lg">
          <span className="block">
            コンポーネントやUIをシェアするプラットフォーム。
          </span>
          あなたが作成したUIを世界中の開発者と共有しましょう。
          他の開発者が作成したUIを使って、デザインを勉強、開発を加速させましょう。
          自由にシェアして、自由に使って、自由に開発。あなたのサイトをより良いものにしましょう。
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/docs">
            Document
            <ChevronRightIcon className="ml-2 hidden h-5 w-5 sm:inline-block" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/components">
            Popular Components
            <ChevronRightIcon className="ml-2 hidden h-5 w-5 sm:inline-block" />
          </Link>
        </Button>
      </div>

      <TopComponent />
    </div>
  );
}
