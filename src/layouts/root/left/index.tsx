import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DesktopCategories,
  DesktopIntroDuction,
  DesktopRankings,
} from "@/layouts/root/left/desktop";
import {
  MobileCategories,
  MobileIntroDuction,
  MobileRankings,
} from "@/layouts/root/left/mobile";

type LeftSideProps = {
  introDuctions: React.ReactNode;
  rankings: React.ReactNode;
  categories: React.ReactNode;
};

const CommonLeftSide = ({
  introDuctions,
  rankings,
  categories,
}: LeftSideProps) => {
  return (
    <ScrollArea className="h-[calc(100dvh-8rem)]">
      <div className="grid h-full gap-y-8">
        <div>
          <p className="mb-3 font-semibold text-primary">イントロダクション</p>
          {introDuctions}
        </div>
        <div>
          <p className="mb-3 font-semibold text-primary">ランキング</p>
          {rankings}
        </div>
        <div>
          <p className="mb-3 font-semibold text-primary">カテゴリー</p>
          {categories}
        </div>
      </div>
    </ScrollArea>
  );
};

export async function DesktopLeftSide() {
  return (
    <CommonLeftSide
      categories={<DesktopCategories />}
      introDuctions={<DesktopIntroDuction />}
      rankings={<DesktopRankings />}
    />
  );
}

export async function MobileLeftSide() {
  return (
    <CommonLeftSide
      categories={<MobileCategories />}
      introDuctions={<MobileIntroDuction />}
      rankings={<MobileRankings />}
    />
  );
}
