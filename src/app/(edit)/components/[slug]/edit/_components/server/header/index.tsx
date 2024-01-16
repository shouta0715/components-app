import { ArrowBigUpDash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ScrollButton } from "@/app/(edit)/components/[slug]/edit/_components/client/scroll-button";
import { StickyTrigger } from "@/app/(edit)/components/[slug]/edit/_components/client/sticky-trigger";
import { EditBreadcrumbs } from "@/app/(edit)/components/[slug]/edit/_components/server/breadcrumbs";
import { Icon } from "@/components/icons/Icon";

export function EditHeader() {
  return (
    <StickyTrigger
      className="sticky top-4 rounded-full border bg-background px-4 py-2"
      margin={4}
      stickyClassName="shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="hidden h-full sm:flex">
          <Link href="/">
            <Icon className=" size-8 " />
            <span className="sr-only">ホームに戻る</span>
          </Link>
          <div aria-hidden className="mx-2 my-1 w-px rounded-md bg-border" />
        </div>

        <div className="flex-1">
          <EditBreadcrumbs />
        </div>

        <div className="flex h-full">
          <div aria-hidden className="mx-2 my-1 w-px rounded-md bg-border" />
          <ScrollButton
            className="h-8 w-8 sm:h-10 sm:w-10"
            size="icon"
            variant="ghost"
          >
            <span className="sr-only">1番上にスクロール</span>
            <ArrowBigUpDash className="h-5 w-5 sm:h-6 sm:w-6 " />
          </ScrollButton>
        </div>
      </div>
    </StickyTrigger>
  );
}
