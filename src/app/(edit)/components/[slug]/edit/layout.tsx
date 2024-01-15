import { Provider } from "jotai";
import React from "react";
import { HydrateEditAtom } from "@/app/(edit)/components/[slug]/edit/_components/client/hydrate-atom";
import { EditHeader } from "@/app/(edit)/components/[slug]/edit/_components/server/header";

import { cacheGetCompWithFiles } from "@/app/(edit)/components/[slug]/edit/_hooks/cache";
import {
  EditStatus,
  FinishedEditStatus,
} from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import { Params } from "@/types/next";
import { EditComp } from "@/types/prisma";

function getInitialEditStatus(data: EditComp): EditStatus {
  const { name, draft, files, document } = data;
  if (!draft)
    return {
      ...FinishedEditStatus,
      Summary: "EDITING",
    };

  const isSummaryEditing = !name || name === "Untitled Component";

  return {
    Summary: isSummaryEditing ? "EDITING" : "SUCCESS",
    Files: files.length ? "SUCCESS" : "EMPTY",
    Document: document ? "SUCCESS" : "EMPTY",
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
} & Params) {
  const data = await cacheGetCompWithFiles(params.slug);

  return (
    <Provider>
      <HydrateEditAtom initialEditStatus={getInitialEditStatus(data)}>
        <EditHeader data={data} />
        <div className="mt-10">{children}</div>
      </HydrateEditAtom>
    </Provider>
  );
}
