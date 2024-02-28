import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { createDraftComp } from "@/actions/components/create";
import { AuthForm } from "@/components/ui/auth-form";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/utils";

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
    </div>
  );
}
