import clsx from "clsx";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SamplePreviews } from "@/components/elements/introductions/about/sample-preview";
import { LoginInfoTable } from "@/components/elements/introductions/login-info-table";
import {
  GitHubButton,
  GoogleButton,
} from "@/components/global/auth/server/auth-button";
import { Icon } from "@/components/icons/Icon";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export const dynamic = "error";

type Faq = {
  question: string;
  answer: React.ReactNode;
};

const faqs: Faq[] = [
  {
    question: "どんなサービスですか？",
    answer:
      "自作のコンポーネントを投稿し、共有するためのサービスです。みんなが投稿したコンポーネントを集めたUIライブラリを作成し、誰でも利用できるようにしています。",
  },

  {
    question: "どんなことができますか？",
    answer:
      "ユーザーが投稿したコンポーネントをiframe上で閲覧・操作することができます。いいね機能もあります。",
  },

  {
    question: "どんな人が利用できますか？",
    answer:
      "誰でも利用できます。ただし、投稿機能やいいね機能などを利用するためにはログインが必要です。",
  },
];

export function About({ auth = false }: { auth?: boolean }) {
  return (
    <div className="animate-fade-in">
      <Section.Root className="gap-12">
        <Section>
          <Section.Title className="mx-auto flex flex-col items-center justify-center gap-4 text-6xl font-bold text-primary sm:text-7xl">
            <Icon className="h-16 sm:h-20" />
            UI TRADE
          </Section.Title>
          <Section.Content className="space-y-4">
            <Section.Description className="leading-7 text-muted-foreground sm:text-lg">
              コンポーネントやUIをシェアするプラットフォーム。
              あなたが作成したUIを世界中の開発者と共有しましょう。
            </Section.Description>
            {auth && (
              <Section.Description className="leading-7 text-muted-foreground sm:text-lg">
                自分のコンポーネント他の開発者に「おすそわけ」しましょう。
                あなたが作ったUIが世界中の開発者に使われるかもしれません。
              </Section.Description>
            )}
            <p className="text-center">
              <Link
                className={clsx(
                  buttonVariants({
                    variant: "link",
                  }),
                  "text-lg text-primary"
                )}
                href="#sample"
              >
                サンプルのコンポーネントを試す
                <ArrowDown className="ml-2 size-5" />
              </Link>
            </p>
          </Section.Content>
        </Section>
        {auth && (
          <Section>
            <Section.Description className="text-center leading-7 text-muted-foreground sm:text-lg">
              あなたもコンポーネントを投稿してみませんか？
            </Section.Description>
            <Section.Content className=" flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GitHubButton />
              <GoogleButton />
            </Section.Content>
          </Section>
        )}

        <Section>
          <Section.Content>
            <dl className="my-6 space-y-10">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-base font-semibold leading-7">
                    Q. {faq.question}
                  </dt>
                  <dd className="mt-2 flex text-base leading-7 text-muted-foreground">
                    <div className="mr-2">A.</div> {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </Section.Content>
        </Section>

        <Section>
          <h2 className="text-2xl font-bold text-primary" id="sample">
            サンプルを試す
          </h2>
          <Section.Content>
            <SamplePreviews />
          </Section.Content>
        </Section>

        <Section>
          <Section.Title>ログインするとできること</Section.Title>
          <LoginInfoTable />
        </Section>

        <Section>
          <Section.Description className="text-center leading-7 text-muted-foreground sm:text-lg">
            あなたもコンポーネントを投稿してみませんか？
          </Section.Description>
          <Section.Content className=" flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GitHubButton />
            <GoogleButton />
          </Section.Content>
        </Section>
      </Section.Root>
    </div>
  );
}
