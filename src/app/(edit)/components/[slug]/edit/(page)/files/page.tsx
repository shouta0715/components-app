import React from "react";
import { checkEditRedirect } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/redirect";
import { Params } from "@/types/next";

export default async function Page({ params }: Params) {
  await checkEditRedirect(params.slug, "Files");

  return <div>page</div>;
}
