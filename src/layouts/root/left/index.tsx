import clsx from "clsx";
import {
  BookCheck,
  Code,
  HeartCrackIcon,
  HelpCircle,
  ImageIcon,
  Tag,
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
    name: "Documentation",
    icon: ImageIcon,
    href: "/docs",
    color:
      "fill-yellow-500 group-hover:fill-yellow-600 dark:group-[.active]:fill-yellow-300 dark:group-hover:fill-yellow-400",
    textClass:
      "dark:group-[.active]:text-yellow-500 dark:group-hover:text-yellow-500",
    boxClass:
      "dark:group-[.active]:bg-yellow-500 dark:group-hover:bg-yellow-500",
  },
  {
    name: "How to use",
    icon: BookCheck,
    href: "/how-to-use",
    color:
      "fill-sky-500 group-hover:fill-sky-600 dark:group-[.active]:fill-sky-300 dark:group-hover:fill-sky-400",
    textClass:
      "dark:group-[.active]:text-sky-500 dark:group-hover:text-sky-500",
    boxClass: "dark:group-[.active]:bg-sky-500 dark:group-hover:bg-sky-500",
  },
  {
    name: "FAQ",
    icon: HelpCircle,
    href: "/faq",
    color:
      "fill-teal-500 group-hover:fill-teal-600 dark:group-[.active]:fill-teal-300 dark:group-hover:fill-teal-400",
    textClass:
      "dark:group-[.active]:text-teal-500 dark:group-hover:text-teal-500",
    boxClass: "dark:group-[.active]:bg-teal-500 dark:group-hover:bg-teal-500",
  },
  {
    name: "About",
    icon: HeartCrackIcon,
    href: "/about",
    color:
      "fill-pink-500 group-hover:fill-pink-600 dark:group-[.active]:fill-pink-300 dark:group-hover:fill-pink-400",
    textClass:
      "dark:group-[.active]:text-pink-500 dark:group-hover:text-pink-500",
    boxClass: "dark:group-[.active]:bg-pink-500 dark:group-hover:bg-pink-500",
  },
];

function IntroDuction() {
  return (
    <nav className="grid gap-1">
      {IntroDuctions.map((introDuction) => (
        <ActiveLink
          key={introDuction.name}
          activeClass="active"
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
              "mr-4 flex items-center justify-center  rounded-md border bg-background p-1 text-white dark:border-background dark:text-current dark:group-hover:text-white dark:group-[.active]:text-white",
              introDuction.boxClass
            )}
          >
            <introDuction.icon
              className={clsx("h-4 w-4 dark:fill-accent", introDuction.color)}
            />
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
    name: "Creator",
    href: "/rankings/creator",
    icon: Users,
  },
  {
    name: "Component",
    href: "/rankings/component",
    icon: Code,
  },
  {
    name: "Category",
    href: "/rankings/category",
    icon: Tag,
  },
];

function Rankings() {
  return (
    <nav className="grid gap-1">
      {rankings.map((ranking) => (
        <ActiveLink
          key={ranking.name}
          activeClass="active"
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
          <div className="mr-4 flex items-center justify-center rounded-md border bg-background p-1 dark:border-background">
            <ranking.icon className="h-4 w-4 dark:fill-accent" />
          </div>
          <span>{ranking.name}</span>
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
          <p className="mb-3 font-semibold text-primary">Introduction</p>
          <IntroDuction />
        </div>
        <div>
          <p className="mb-3 font-semibold text-primary">Rankings</p>
          <Rankings />
        </div>
        <div>
          <p className="mb-3 font-semibold text-primary">Categories</p>
          <Categories />
        </div>
      </div>
    </ScrollArea>
  );
}
