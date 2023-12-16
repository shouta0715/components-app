"use client";

import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel, {
  EmblaOptionsType,
  EmblaCarouselType,
} from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils";

type AutoplayOptions = {
  delay?: number;
  jump?: boolean;
  playOnInit?: boolean;
  stopOnInteraction?: boolean;
  stopOnMouseEnter?: boolean;
  stopOnFocusIn?: boolean;
  stopOnLastSnap?: boolean;
  rootNode?: (emblaRoot: HTMLElement) => HTMLElement | null;
};

const defaultAutoplayOptions: AutoplayOptions = {
  delay: 4000,
  stopOnInteraction: false,
  jump: false,
  playOnInit: true,
  stopOnMouseEnter: false,
  stopOnFocusIn: false,
  stopOnLastSnap: false,
};

const defaultOptions: EmblaOptionsType = {
  loop: true,
  active: true,
  align: "center",
  axis: "x",
  dargFree: false,
};

type ClassNames = {
  root?: string;
  viewport?: string;
  container?: string;
};

type CarouselProps = {
  options?: EmblaOptionsType;
  className?: string;
  classNames?: ClassNames;
  autoplay?: boolean;
  children: React.ReactNode;
  autoplayOptions?: AutoplayOptions;
  arrow?: boolean;
  dots?: boolean;
};

function CarouselLink({ href }: { href: string }) {
  return <Link className="absolute inset-0 z-20" href={href} />;
}

const CarouselSlider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    classNames?: { inner?: string };
    href?: string;
  }
>(({ className, classNames, children, href, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn("flex relative shrink-0 grow-0 basis-2/3", className)}
    >
      {href && <CarouselLink href={href} />}
      <div className={cn("relative w-full", classNames?.inner)}>{children}</div>
    </div>
  );
});

function CarouselDots({ api }: { api: EmblaCarouselType }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api]
  );

  const onInit = useCallback((a: EmblaCarouselType) => {
    setScrollSnaps(a.scrollSnapList());
  }, []);

  const onSelect = useCallback((a: EmblaCarouselType) => {
    setSelectedIndex(a.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    onInit(api);
    onSelect(api);
    api.on("reInit", onInit);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
  }, [api, onInit, onSelect]);

  return (
    <div className="flex justify-center gap-x-2">
      {scrollSnaps.map((_, index) => (
        <button
          // eslint-disable-next-line react/no-array-index-key
          key={`dot-${index}`}
          className={clsx(
            "group grid h-4 w-4 place-items-center rounded-full border-gray-300 bg-accent hover:bg-primary",
            index === selectedIndex && "bg-primary"
          )}
          onClick={() => onDotButtonClick(index)}
          type="button"
        >
          <Circle
            className={clsx(
              "h-2 w-2 fill-white dark:fill-black",
              index === selectedIndex
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            )}
          />
          <span className="sr-only">
            Slide
            {index + 1}
          </span>
        </button>
      ))}
    </div>
  );
}

function CarouselArrow({ api }: { api: EmblaCarouselType }) {
  const scrollPrev = useCallback(() => api && api.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api && api.scrollNext(), [api]);

  return (
    <>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 text-accent"
        onClick={scrollPrev}
        type="button"
      >
        <ChevronLeft className="h-14 w-14" />
        <span className="sr-only">Previous</span>
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 text-accent"
        onClick={scrollNext}
        type="button"
      >
        <ChevronRight className="h-14 w-14" />
        <span className="sr-only">Next</span>
      </button>
    </>
  );
}

function CarouselLoading() {
  return (
    <div className="h-72 ">
      <div className="relative flex h-full gap-8">
        <Skeleton className="h-full w-full basis-1/3" />
        <Skeleton className="h-full w-full basis-2/3" />
        <Skeleton className="h-full w-full basis-1/3" />
        <div className="absolute z-10 h-full w-full transition-opacity [backgroundImage:linear-gradient(180deg,transparent_0_30%,hsl(var(--background))_95%_100%)]" />
      </div>
      <div className="flex justify-center gap-x-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            // eslint-disable-next-line react/no-array-index-key
            key={`dot-${index}-skelton`}
            className="h-4 w-4 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

function Carousel({
  options: op,
  autoplay,
  children,
  className,
  classNames,
  autoplayOptions: ao,
  arrow,
  dots,
}: CarouselProps) {
  const options = { ...defaultOptions, ...op };
  const autoplayOptions = {
    ...defaultAutoplayOptions,
    ...ao,
  };
  const plugins = autoplay ? [Autoplay(autoplayOptions)] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <CarouselLoading />;

  return (
    <div className={cn("relative", classNames?.root)}>
      <div ref={emblaRef} className={cn(classNames?.viewport)}>
        <div className={cn("flex", className, classNames?.container)}>
          {children}
        </div>
      </div>
      {arrow && <CarouselArrow api={emblaApi} />}
      {dots && <CarouselDots api={emblaApi} />}
    </div>
  );
}

CarouselSlider.displayName = "CarouselSlider";
export { CarouselSlider, Carousel };
