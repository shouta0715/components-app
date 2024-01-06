import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getDisplayName } from "@/utils";

const Sizes = {
  sm: "size-6 text-xs sm:size-7 sm:text-sm",
  md: "size-7 text-sm sm:size-8 sm:text-base",
  lg: "size-8 text-base sm:size-10 sm:text-lg",
};

const TextSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

type ClassNames = {
  root?: string;
  image?: string;
  fallback?: string;
  name?: string;
};

type AvatarLinkProps = {
  id: string;
  image: string | null;
  name: string | null;
  showName?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    size?: keyof typeof Sizes;
    classNames?: ClassNames;
  };

export function AvatarLink({
  id,
  image,
  name,
  showName = true,
  size = "md",
  classNames,
}: AvatarLinkProps) {
  return (
    <Link
      className={cn("flex items-center gap-2", classNames?.root)}
      href={`/users/${id}`}
    >
      <Avatar className={Sizes[size]}>
        <AvatarImage className={classNames?.image} src={image ?? ""} />
        <AvatarFallback className={classNames?.fallback}>
          {name?.slice(0, 2) ?? "UK"}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <p
          className={cn(
            "line-clamp-1 w-full text-primary break-all",
            TextSizes[size],
            classNames?.name
          )}
        >
          {getDisplayName(name)}
        </p>
      )}
    </Link>
  );
}
