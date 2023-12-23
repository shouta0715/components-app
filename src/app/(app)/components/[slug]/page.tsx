import { notFound } from "next/navigation";
import React from "react";
import { UserInfo } from "@/components/elements/users/user-info";
import { Link } from "@/components/ui/link";
import { getComp } from "@/services/components/get";
import { Params } from "@/types/next";

export default async function Page({ params }: Params) {
  const component = await getComp(params.slug, true);

  if (component.draft) notFound();

  return (
    <div className="grid gap-8">
      <div>
        <p className="font-semibold leading-7 text-muted-foreground">
          <Link className="px-0 text-current sm:text-base" href="/categories">
            Categories
          </Link>
          <span className="px-2">/</span>
          <Link
            className="px-0 text-current  sm:text-base"
            href={`/categories/${component.category.id}`}
          >
            {component.category.name}
          </Link>
        </p>
        <h1 className="text-2xl font-bold text-primary sm:text-3xl">
          {component.name}
        </h1>
      </div>

      {/* Main Component Preview and User Info */}
      <div>
        <UserInfo creator={component.creator} />
      </div>
    </div>
  );
}
