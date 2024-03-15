import clsx from "clsx";
import {
  Code,
  Flame,
  HandCoins,
  HelpCircle,
  Rocket,
  Users,
} from "lucide-react";
import React from "react";
import { ActiveLink } from "@/components/ui/active-link";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCategories } from "@/services/category/get";
import { cn } from "@/utils";

const IntroDuctions = [
  {
    name: "使い方",
    icon: Flame,
    href: "/how-to-use",
    color:
      "group-hover:text-red-600 group-hover:fill-red-600 group-[.active]:text-red-600 group-[.active]:fill-red-600",
    textClass:
      "group-hover:text-red-600 group-hover:underline group-[.active]:text-red-600 group-[.active]:underline",
    boxClass: "group-hover:border-red-600 group-[.active]:border-red-600",
  },
  {
    name: "UI Tradeについて",
    icon: HandCoins,
    href: "/about",
    color: "group-hover:text-sky-600 group-[.active]:text-sky-600",
    textClass:
      "group-hover:text-sky-600 group-hover:underline group-[.active]:text-sky-600 group-[.active]:underline",
    boxClass: "group-hover:border-sky-600 group-[.active]:border-sky-600",
  },
  {
    name: "よくある質問",
    icon: HelpCircle,
    href: "/faq",
    color: "group-hover:text-green-600 group-[.active]:text-green-600",
    textClass:
      "group-hover:text-green-600 group-hover:underline group-[.active]:text-green-600 group-[.active]:underline",
    boxClass: "group-hover:border-green-600 group-[.active]:border-green-600",
  },
];

function IntroDuction() {
  return (
    <nav className="grid gap-1">
      {IntroDuctions.map((introDuction) => (
        <ActiveLink
          key={introDuction.name}
          activeClass="active pointer-events-none font-semibold"
          className={cn(
            buttonVariants({
              variant: "link",
              size: "sm",
              radius: "default",
              className: "justify-start group px-0 flex text-muted-foreground ",
            })
          )}
          href={introDuction.href}
        >
          <div
            className={clsx(
              "mr-4 flex items-center justify-center rounded-md border border-border bg-background p-1",
              introDuction.boxClass
            )}
          >
            <introDuction.icon className={clsx("size-4", introDuction.color)} />
          </div>
          <span className={clsx(introDuction.textClass)}>
            {introDuction.name}
          </span>
        </ActiveLink>
      ))}
    </nav>
  );
}

const rankings = [
  {
    name: "トレンド",
    href: "/rankings/trend",
    icon: Rocket,
  },
  {
    name: "クリエイター",
    href: "/rankings/creator",
    icon: Users,
  },
  {
    name: "コンポーネント",
    href: "/rankings/component",
    icon: Code,
  },
];

function Rankings() {
  return (
    <nav className="grid gap-1">
      {rankings.map((ranking) => (
        <ActiveLink
          key={ranking.name}
          activeClass="active pointer-events-none font-semibold"
          className={cn(
            buttonVariants({
              variant: "link",
              size: "sm",
              radius: "default",
              className: "justify-start group px-0 flex text-muted-foreground ",
            })
          )}
          href={ranking.href}
        >
          <div className="mr-4 flex items-center justify-center rounded-md border bg-background p-1">
            <ranking.icon className="size-4 group-[.active]:text-primary" />
          </div>
          <span className="group-hover:text-primary group-hover:underline group-[.active]:text-primary group-[.active]:underline">
            {ranking.name}
          </span>
        </ActiveLink>
      ))}
    </nav>
  );
}

async function Categories() {
  const categories = await getCategories(50);

  return (
    <nav>
      {categories.map((category) => (
        <ActiveLink
          key={category.name}
          activeClass="pointer-events-none font-semibold text-primary underline"
          className={cn(
            buttonVariants({
              variant: "link",
              size: "sm",
              radius: "default",
              className:
                "justify-start capitalize px-0 block text-muted-foreground ",
            })
          )}
          href={`/categories/${category.name}`}
        >
          {category.name}
        </ActiveLink>
      ))}
    </nav>
  );
}

export async function LeftSide() {
  return (
    <ScrollArea className="h-[calc(100dvh-8rem)]">
      <div className="grid h-full gap-y-8">
        <div>
          <p className="mb-3 font-semibold text-primary">イントロダクション</p>
          <IntroDuction />
        </div>
        <div>
          <p className="mb-3 font-semibold text-primary">ランキング</p>
          <Rankings />
        </div>
        <div>
          <p className="mb-3 font-semibold text-primary">カテゴリー</p>
          <Categories />
        </div>
      </div>
    </ScrollArea>
  );
}
