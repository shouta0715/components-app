import clsx from "clsx";
import { BuildTimeBadge } from "@/components/elements/badges/build-time";
import { UIComponent } from "@/components/elements/ui-components";
import { CreateComponentButton } from "@/components/elements/ui-components/create-button";
import { RankingIcon } from "@/components/icons/ranking";
import { Section } from "@/components/ui/section";
import { getRankingComponents } from "@/services/components/get/ranking";
import { getBuildDate } from "@/utils/time/build-date";

const buildDate = getBuildDate();

export const dynamic = "error";

export default async function Page() {
  const components = await getRankingComponents(20);

  const hasComponents = components.length > 0;

  return (
    <Section.Root>
      <Section>
        <div>
          <Section.Title className="flex items-center justify-between">
            ランキング
            <BuildTimeBadge date={buildDate} />
          </Section.Title>
          <Section.Description className="mt-2 text-sm">
            いいねの数が多いコンポーネントをランキングで表示しています。
          </Section.Description>
        </div>

        <Section.Content>
          {hasComponents ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-y-10">
              {components.map((component, i) => {
                return (
                  <div key={component.id} className="relative overflow-hidden">
                    {i < 3 && (
                      <RankingIcon
                        className={clsx(
                          "absolute -left-4 z-10",
                          i === 0 && "fill-gold",
                          i === 1 && "fill-silver",
                          i === 2 && "fill-bronze"
                        )}
                        text={i + 1}
                      />
                    )}
                    <UIComponent
                      {...component}
                      count={component._count.likes}
                      extensions={component.files}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-20 w-full text-center leading-7">
              <p className="text-lg font-bold">
                まだコンポーネントがありません。
              </p>
              <div className="mt-4 space-y-4">
                <p className="text-muted-foreground">
                  あなたが最初のコンポーネントを投稿しましょう。
                </p>
                <CreateComponentButton variant="default">
                  投稿してみましょう
                </CreateComponentButton>
              </div>
            </div>
          )}
        </Section.Content>
      </Section>
    </Section.Root>
  );
}
