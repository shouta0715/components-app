import clsx from "clsx";
import { ChevronDown, ChevronRight, RotateCw } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SamplePreviews } from "@/components/elements/introductions/about/sample-preview";
import { LoginInfoTable } from "@/components/elements/introductions/login-info-table";
import { CreateComponentButton } from "@/components/elements/ui-components/create-button";
import {
  GitHubButton,
  GoogleButton,
} from "@/components/global/auth/server/auth-button";
import { LangIcons } from "@/components/icons/LangIcons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

type Faq = {
  id: string;
  question: React.ReactNode;
  answer: React.ReactNode;
};

const faqs: Faq[] = [
  {
    id: "1",
    question: "どんなサービスですか？",
    answer: (
      <>
        <p>自作のコンポーネントを投稿し、共有するためのサービスです。</p>
        <br />
        <p>
          みんなが投稿したコンポーネントを集めたUIライブラリを作成し、誰でも利用できるようにしています。
        </p>
        <br />
        <p>
          ランキングやいいね機能などを利用して、人気のあるコンポーネントを見つけることができます。
        </p>
        <Link
          className={clsx(
            buttonVariants({
              variant: "link",
            }),
            "pl-0 underline"
          )}
          href="/about"
        >
          もっと知る
        </Link>
      </>
    ),
  },
  {
    id: "sample",
    question: "サンプルを試す",
    answer: (
      <>
        <p className="mb-4">
          <span className="mb-1 block">
            Previewをクッリクすると、コンポーネントをiframe上で閲覧・操作することができます。
          </span>
          <span>
            Codeをクリックすると、コンポーネントのコードをコピーすることができます。
          </span>
        </p>
        <SamplePreviews />,
      </>
    ),
  },
  {
    id: "2",
    question: "このサイトはどのように利用しますか？",
    answer: (
      <>
        <p>
          使用したいコンポーネントを見つけて、コードをコピーして利用することができます。
        </p>
        <br />
        <p>詳しい使い方は、使い方のページを確認してください。</p>
        <Link
          className={clsx(
            buttonVariants({
              variant: "link",
            }),
            "pl-0 underline"
          )}
          href="/how-to-use"
        >
          使い方はこちら
        </Link>
      </>
    ),
  },
  {
    id: "3",
    question: "ログインは必要ですか？",
    answer: (
      <>
        <p>いいえ、ログインは必要ありません。</p>
        <br />
        <p>ただし、投稿やいいね機能を利用するためにはログインが必要です。</p>
        <br />

        <p>
          GitHubアカウントまたはGoogleアカウントでログインすることができます。
        </p>
        <div className=" mt-4 flex flex-col items-center justify-center gap-4 text-primary sm:flex-row">
          <GitHubButton />
          <GoogleButton />
        </div>
      </>
    ),
  },
  {
    id: "4",
    question: "ログインすると何ができますか？",
    answer: (
      <>
        <p className="mb-4">
          主な違いは、保存する機能を利用できるかどうかです。
        </p>

        <LoginInfoTable />
      </>
    ),
  },
  {
    id: "5",
    question: "コンポーネントを投稿するにはどうすればいいですか？",
    answer: (
      <>
        <p>
          ログイン後、投稿ページからコンポーネントを投稿することができます。
          また、CLIを利用してローカルから投稿することもできます。
        </p>
        <br />
        <div className="text-center">
          <CreateComponentButton className="text-primary">
            コンポーネントを投稿する
            <ChevronRight className="ml-2 size-5" />
          </CreateComponentButton>
        </div>
      </>
    ),
  },
  {
    id: "6",
    question: "CLIを利用して投稿するにはどうすればいいですか？",
    answer: (
      <>
        <p>詳しくは、CLIの使い方のページを確認してください。</p>
        <Link
          className={clsx(
            buttonVariants({
              variant: "link",
            }),
            "pl-0 underline"
          )}
          href="/how-to-use"
        >
          CLIの使い方はこちら
        </Link>
      </>
    ),
  },
];

const systemFaqs: Faq[] = [
  {
    id: "preview-error",
    question: "プレビュー画面にエラーが表示されます",
    answer: (
      <>
        <p>
          プレビューのリロードボタン
          <RotateCw
            ari-label="リロードボタン"
            className="mx-2 inline-block size-4"
          />
          をクリックしてみてください。
        </p>
        <br />
        <p>
          それでも解決しない場合は、コードを確認して悪意のあるコードが含まれていないか確認してから使用してください。
        </p>
        <br />
        <p className="text-xs">
          ※30秒以内に描画されないコンポーネントは自動的にタイムアウトエラーが表示されます。
        </p>
      </>
    ),
  },
  {
    id: "trend-standard",
    question: "トレンドの基準は何ですか？",
    answer: (
      <>
        <p>
          いいね1回に対して、12時間以内は0.5pt、24時間以内は0.3pt、3日以内は0.1ptとして合計値順に表示されます。
        </p>
        <br />
        <p className="flex flex-col space-y-2">
          <span>
            ※計算例:
            12時間以内のいいねが10回、24時間以内のいいねが5回、3日以内のいいねが3回の場合
          </span>
          <span>12時間以内: 10 * 0.5 = 5pt</span>
          <span>24時間以内: 5 * 0.3 = 1.5ptA</span>
          <span>3日以内: 3 * 0.1 = 0.3pt</span>
          <span>合計: 5 + 1.5 + 0.3 = 6.8pt</span>
        </p>
      </>
    ),
  },
];

const uploadFaqs: Faq[] = [
  {
    id: "file-type",
    question: "どの拡張子のファイルをアップロードできますか？",
    answer: (
      <>
        <p className="mb-4">以下の拡張子のファイルをアップロードできます。</p>
        <div className="mb-4 flex flex-wrap gap-4">
          {Object.keys(LangIcons).map((lang) => {
            const Icon = LangIcons[lang as keyof typeof LangIcons];

            return (
              <span key={lang} className="items-center justify-center text-xs">
                <Icon
                  key={lang}
                  aria-label={lang}
                  className="mr-1 inline-block size-6"
                />
                {lang.toUpperCase()}
              </span>
            );
          })}
        </div>
        <p className="text-xs">
          ※プレビューを表示するには、html またはjsx,
          tsxのファイルは必ずアップロードする必要があります。
        </p>
      </>
    ),
  },
  {
    id: "files-upload-limit",
    question: "ファイルはいくつまでアップロードできますか？",
    answer: "3つまでです。",
  },
  {
    id: "file-size-limit",
    question: "ファイルのサイズはどのくらいまでアップロードできますか？",
    answer: "1つにつき10MBまでです。",
  },
  {
    id: "image-upload",
    question: "ファイル以外に画像をアップロードするのはなぜですか？",
    answer: (
      <>
        <p>
          コンポーネントの一覧ページなどで、コンポーネントのプレビュー画像を表示するためです。
          <span>
            ※メモリとセキュリティの関係上、一覧ページではiframeでのプレビューは表示されません。
          </span>
        </p>
        <p>
          詳細ページではコードを下にiframeに表示したものがプレビューとして表示されます。
        </p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <div className="animate-fade-in">
      <Section.Root className="gap-16">
        <Section>
          <Section.Title className="text-center">よくある質問</Section.Title>
          <div aria-label="使い方の質問一覧">
            <span className="text-muted-foreground">目次</span>
            <p className="flex flex-wrap gap-4 text-center">
              <Link
                className={clsx(
                  buttonVariants({
                    variant: "link",
                    className: "underline",
                  }),
                  "pl-0"
                )}
                href="#faq"
              >
                使い方の質問一覧
                <ChevronDown className="ml-2 size-5" />
              </Link>
              <Link
                className={clsx(
                  buttonVariants({
                    variant: "link",
                    className: "underline",
                  }),
                  "pl-0"
                )}
                href="#component-faq"
              >
                コンポーネントに関する質問一覧
                <ChevronDown className="ml-2 size-5" />
              </Link>
              <Link
                className={clsx(
                  buttonVariants({
                    variant: "link",
                    className: "underline",
                  }),
                  "pl-0"
                )}
                href="#upload-faq"
              >
                投稿に関する質問一覧
                <ChevronDown className="ml-2 size-5" />
              </Link>
            </p>
          </div>
          <Section.Content>
            <h3 className="scroll-m-20 text-muted-foreground" id="faq">
              使い方のよくある質問一覧
            </h3>
            <Accordion
              className="space-y-8 divide-y "
              defaultValue={["1"]}
              type="multiple"
            >
              <dl>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <dt>
                      <AccordionTrigger className="py-6 font-semibold leading-7">
                        {faq.question}
                      </AccordionTrigger>
                    </dt>

                    <dd>
                      <AccordionContent>
                        <div className="text-muted-foreground">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </dd>
                  </AccordionItem>
                ))}
              </dl>
            </Accordion>
          </Section.Content>
        </Section>

        <Section>
          <Section.Content>
            <h3
              className="scroll-m-20 text-muted-foreground"
              id="component-faq"
            >
              コンポーネントに関するよくある質問一覧
            </h3>
            <Accordion className="space-y-8 divide-y" type="multiple">
              <dl>
                {systemFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <dt>
                      <AccordionTrigger className="py-6 font-semibold leading-7">
                        {faq.question}
                      </AccordionTrigger>
                    </dt>

                    <dd>
                      <AccordionContent>
                        <div className="text-muted-foreground">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </dd>
                  </AccordionItem>
                ))}
              </dl>
            </Accordion>
          </Section.Content>
        </Section>
        <Section>
          <Section.Content>
            <h3 className="scroll-m-20 text-muted-foreground" id="upload-faq">
              投稿に関するよくある質問一覧
            </h3>
            <Accordion className="space-y-8 divide-y " type="multiple">
              <dl>
                {uploadFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <dt>
                      <AccordionTrigger className="py-6 font-semibold leading-7">
                        {faq.question}
                      </AccordionTrigger>
                    </dt>

                    <dd>
                      <AccordionContent>
                        <div className="text-muted-foreground">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </dd>
                  </AccordionItem>
                ))}
              </dl>
            </Accordion>
          </Section.Content>
        </Section>

        <p>
          上記の質問で解決しない場合は
          <a
            className={clsx(
              buttonVariants({
                variant: "link",
                className: "underline",
              })
            )}
            href="/contact"
          >
            こちら
          </a>
          までお問い合わせください。
        </p>
      </Section.Root>
    </div>
  );
}
