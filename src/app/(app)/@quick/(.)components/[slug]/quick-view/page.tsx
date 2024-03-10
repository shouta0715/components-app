import Link from "next/link";
import React, { Suspense } from "react";
import {
  QuickView,
  QuickViewLoader,
} from "@/app/(app)/(page)/categories/[name]/_features/quick-view";
import { InterceptingModalProvider } from "@/components/elements/intercepting-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Params } from "@/types/next";

export default async function Page({ params }: Params) {
  return (
    <InterceptingModalProvider>
      <DialogContent className="top-10 z-[100] block max-h-[91.666667%] max-w-none translate-y-0 overflow-y-auto data-[state=closed]:slide-out-to-top-0 data-[state=open]:slide-in-from-top-0">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Quick View
          </DialogTitle>
          <DialogDescription className="mt-2">
            詳しい情報を見るには
            <Link
              className="px-2 font-semibold text-primary underline underline-offset-4"
              href={`/components/${params.slug}`}
            >
              こちら
            </Link>
            をクリックしてください。
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex-1">
          <Suspense fallback={<QuickViewLoader />}>
            <QuickView slug={params.slug} />
          </Suspense>
          <p className="mt-4 flex justify-between">
            <DialogClose asChild>
              <Button className="px-6" type="button" variant="secondary">
                閉じる
              </Button>
            </DialogClose>

            <Link
              className={buttonVariants({
                className: "font-semibold px-6",
              })}
              href={`/components/${params.slug}`}
            >
              使い方を見る
            </Link>
          </p>
        </div>
      </DialogContent>
    </InterceptingModalProvider>
  );
}
