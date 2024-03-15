import {
  Code,
  Flame,
  HandCoins,
  HelpCircle,
  Rocket,
  Users,
} from "lucide-react";

export const introDuctions = [
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

export const rankings = [
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
