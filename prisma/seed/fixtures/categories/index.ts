/* eslint-disable no-console */
import { Category, Prisma } from "@prisma/client";

const categoriesFixture: Prisma.CategoryCreateInput[] = [
  {
    name: "Button",
    description: "インタラクティブなボタンコンポーネント",
  },
  {
    name: "Accordion",
    description: "折り畳み可能なアコーディオンコンポーネント",
  },
  {
    name: "Dialog",
    description: "モーダルダイアログやポップアップ",
  },
  {
    name: "Card",
    description: "情報を表示するカードコンポーネント",
  },
  {
    name: "Avatar",
    description: "ユーザーアバターを表示するコンポーネント",
  },
  { name: "Form", description: "入力フォームやフォーム要素" },
  {
    name: "Table",
    description: "データテーブル表示コンポーネント",
  },
  {
    name: "Menu",
    description: "メニューとナビゲーションコンポーネント",
  },
  {
    name: "Tooltip",
    description: "情報提示のためのツールチップコンポーネント",
  },
  { name: "Tabs", description: "タブ切り替えコンポーネント" },
  {
    name: "Alert",
    description: "警告や通知を表示するアラートコンポーネント",
  },
];

export async function seedCategories(
  tx: Prisma.TransactionClient
): Promise<Category[]> {
  const category = await tx.category.findFirst();

  if (category) {
    console.log("Categories already seeded");

    return tx.category.findMany();
  }
  await tx.category.createMany({
    data: categoriesFixture,
  });

  return tx.category.findMany();
}
