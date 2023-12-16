import React from "react";
import { Image } from "@/components/elements/images";
import { Carousel, CarouselSlider } from "@/components/ui/carousel";
import { cache } from "@/lib/next/cache";
import { getTopComps } from "@/services/components/get";
import { getImageUrl } from "@/utils";

export async function TopComponent() {
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
              <div className="absolute z-10 h-full w-full opacity-100 transition-opacity [backgroundImage:linear-gradient(180deg,transparent_0_30%,hsl(var(--background))_95%_100%)] group-hover:opacity-0" />
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
