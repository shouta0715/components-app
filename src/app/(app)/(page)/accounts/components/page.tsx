import React, { Suspense } from "react";
import { MeComponent } from "@/app/(app)/(page)/accounts/components/_components/ui-component";
import { SearchParamsPagination } from "@/components/elements/pagination/search-params";
import { Section } from "@/components/ui/section";
import { getSessionUser } from "@/lib/auth/handlers";
import { getMeComponentCount } from "@/services/components/get/counts";
import { getMeComponents } from "@/services/components/get/me";
import { SearchParams } from "@/types/next";
import { parseSearchParams } from "@/utils";
import { checkOverPage } from "@/utils/pagination";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: SearchParams) {
  const search = parseSearchParams(searchParams);
  const user = await getSessionUser();

  const total = await getMeComponentCount(user.id);

  checkOverPage({
    total,
    current: search.page,
    pathname: `/accounts/components`,
  });

  const components = await getMeComponents({ userId: user.id, take: 10 });

  return (
    <div>
      <Section>
        <Section.Title>投稿の管理</Section.Title>

        <Section.Content>
          <div className="space-y-8">
            {components.map((component) => {
              return (
                <MeComponent
                  key={component.id}
                  {...component}
                  count={component._count.likes}
                  extensions={component.files}
                />
              );
            })}
          </div>
        </Section.Content>
      </Section>

      <nav
        aria-label="Pagination"
        className="mt-6 flex items-center justify-between py-3 sm:px-6"
      >
        <div className="flex flex-1 justify-center">
          <Suspense>
            <SearchParamsPagination
              className="font-semibold"
              prevButtonProps={{
                variant: "ghost",
                className: "mr-2",
              }}
              take={10}
              total={total}
            />
          </Suspense>
        </div>
      </nav>
    </div>
  );
}
