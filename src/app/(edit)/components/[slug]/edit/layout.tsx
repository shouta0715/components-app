import { Provider } from "jotai";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { HydrateEditAtom } from "@/app/(edit)/components/[slug]/edit/_components/client/hydrate-atom";
import { EditHeader } from "@/app/(edit)/components/[slug]/edit/_components/server/header";

import { cacheGetCompWithFiles } from "@/app/(edit)/components/[slug]/edit/_hooks/cache";
import {
  EditStatus,
  FinishedEditStatus,
} from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import { getComponentCreatedStatus } from "@/app/(edit)/components/[slug]/edit/_hooks/utils";
import { assertMine } from "@/lib/auth/handlers";
import { Params } from "@/types/next";
import { EditComp } from "@/types/prisma";

function getInitialEditStatus(data: EditComp): EditStatus {
  const { name, draft, files, document } = data;
  if (!draft)
    return {
      ...FinishedEditStatus,
      Summary: "EDITING",
    };

  const { summaryCreated, filesCreated, documentCreated } =
    getComponentCreatedStatus({ name, files, document });

  return {
    Summary: summaryCreated ? "CREATED" : "EMPTY_EDITING",
    Files: filesCreated ? "CREATED" : "EMPTY",
    Document: documentCreated ? "CREATED" : "EMPTY",
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
} & Params) {
  const data = await cacheGetCompWithFiles(params.slug);
  await assertMine(data.creatorId, notFound);

  return (
    <Provider>
      <HydrateEditAtom initialEditStatus={getInitialEditStatus(data)}>
        <Suspense>
          <EditHeader />
        </Suspense>
        <div className="mt-10">{children}</div>
      </HydrateEditAtom>
    </Provider>
  );
}
