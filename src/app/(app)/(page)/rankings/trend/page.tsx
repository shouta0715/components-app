import React from "react";
import { TrendComponents } from "@/app/(app)/(page)/_components/trend";
import { BuildTimeBadge } from "@/components/elements/badges/build-time";
import { Section } from "@/components/ui/section";
import { getTrendComponents } from "@/services/components/get/trend";
import { getBuildDate } from "@/utils/time/build-date";

const buildDate = getBuildDate();

export const dynamic = "error";

export default async function Page() {
  const components = await getTrendComponents({
    limit: 30,
    offset: 0,
  });

  return (
    <Section.Root className="animate-fade-in">
      <Section>
        <div>
          <Section.Title className="flex items-center justify-between">
            トレンド
            <BuildTimeBadge date={buildDate} />
          </Section.Title>
          <Section.Description className="mt-2 text-sm">
            直近のいいねを元に算出されたトレンドコンポーネントです。
          </Section.Description>
        </div>

        <Section.Content>
          <TrendComponents components={components} />
        </Section.Content>
      </Section>
    </Section.Root>
  );
}
