import { notFound } from "next/navigation";
import React from "react";
import { ComponentDocument } from "@/components/elements/documents/component-document";
import { FilePreviews } from "@/components/elements/files/file-previe";
import { UserInfo } from "@/components/elements/users/user-info";
import { Link } from "@/components/ui/link";
import { getCompWithFiles } from "@/services/components/get";
import { getFiles } from "@/services/files/get";
import { Params } from "@/types/next";

export default async function Page({ params }: Params) {
  const component = await getCompWithFiles(params.slug, true);

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
            href={`/categories/${component.category.name}`}
          >
            {component.category.name}
          </Link>
        </p>
        <h1 className="text-2xl font-bold text-primary sm:text-3xl">
          {component.name}
        </h1>
      </div>
      {/* Main Component Preview and User Info */}
      <div className="grid flex-1 gap-8">
        <UserInfo creator={component.creator} />

        <FilePreviews
          getObject={async () => getFiles(component.files)}
          name={component.name}
        />

        <ComponentDocument>{component.document}</ComponentDocument>
      </div>
    </div>
  );
}
