import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { TopComponent } from "@/components/elements/components/top";
import { Button } from "@/components/ui/button";

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
