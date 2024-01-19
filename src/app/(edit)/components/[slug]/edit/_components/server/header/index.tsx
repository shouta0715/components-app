import { ArrowBigUpDash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { EditSteps } from "@/app/(edit)/components/[slug]/edit/_components/client/breadcrumbs";
import { ScrollButton } from "@/app/(edit)/components/[slug]/edit/_components/client/scroll-button";
import { StickyTrigger } from "@/app/(edit)/components/[slug]/edit/_components/client/sticky-trigger";

import { Icon } from "@/components/icons/Icon";

export function EditHeader() {
  return (
    <StickyTrigger
      className="sticky top-4 rounded-full border bg-background px-2.5 md:px-4"
      margin={4}
      stickyClassName="shadow-md"
    >
      <div className="flex h-full items-center justify-between">
        <div className="flex h-full">
          <Link
            className="flex h-8  w-8 flex-1 items-center justify-center sm:h-10 sm:w-10"
            href="/"
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">ホームに戻る</span>
          </Link>
          <div aria-hidden className="mx-2 my-1 w-px bg-border" />
        </div>

        <EditSteps />

        <div className="flex h-full">
          <div aria-hidden className="mx-2 my-1 w-px  bg-border" />
          <ScrollButton
            className="h-8 w-8 sm:h-10 sm:w-10"
            size="icon"
            variant="ghost"
          >
            <span className="sr-only">1番上にスクロール</span>
            <ArrowBigUpDash className="h-5 w-5 sm:h-6 sm:w-6" />
          </ScrollButton>
        </div>
      </div>
    </StickyTrigger>
  );
}
