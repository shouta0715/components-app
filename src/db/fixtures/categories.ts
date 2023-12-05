/* eslint-disable no-console */
import { createId } from "@paralleldrive/cuid2";

import * as schema from "@/db/schema";

import { Tx } from "@/db/seed/client";
import { Category } from "@/types/drizzle";

const categoriesFixture = [
  {
    id: createId(),
    name: "Button",
    description: "インタラクティブなボタンコンポーネント",
  },
  {
    id: createId(),
    name: "Accordion",
    description: "折り畳み可能なアコーディオンコンポーネント",
  },
  {
    id: createId(),
    name: "Dialog",
    description: "モーダルダイアログやポップアップ",
  },
  {
    id: createId(),
    name: "Card",
    description: "情報を表示するカードコンポーネント",
  },
  {
    id: createId(),
    name: "Avatar",
    description: "ユーザーアバターを表示するコンポーネント",
  },
  { id: createId(), name: "Form", description: "入力フォームやフォーム要素" },
  {
    id: createId(),
    name: "Table",
    description: "データテーブル表示コンポーネント",
  },
  {
    id: createId(),
    name: "Menu",
    description: "メニューとナビゲーションコンポーネント",
  },
  {
    id: createId(),
    name: "Tooltip",
    description: "情報提示のためのツールチップコンポーネント",
  },
  { id: createId(), name: "Tabs", description: "タブ切り替えコンポーネント" },
  {
    id: createId(),
    name: "Alert",
    description: "警告や通知を表示するアラートコンポーネント",
  },
  {
    id: createId(),
    name: "Badge",
    description: "ラベルやステータス表示のためのバッジコンポーネント",
  },
  {
    id: createId(),
    name: "Breadcrumb",
    description: "ナビゲーションパスを示すブレッドクラムコンポーネント",
  },
  {
    id: createId(),
    name: "Carousel",
    description: "画像やコンテンツのカルーセル",
  },
  {
    id: createId(),
    name: "Checkbox",
    description: "チェックボックスコンポーネント",
  },
  {
    id: createId(),
    name: "Chip",
    description: "タグや要素を表すチップコンポーネント",
  },
  {
    id: createId(),
    name: "DatePicker",
    description: "日付選択のためのデートピッカーコンポーネント",
  },
  {
    id: createId(),
    name: "Drawer",
    description: "サイドバーなどの引き出しコンポーネント",
  },
  {
    id: createId(),
    name: "Dropdown",
    description: "ドロップダウン選択コンポーネント",
  },
  {
    id: createId(),
    name: "Fab",
    description: "フローティングアクションボタン",
  },
  {
    id: createId(),
    name: "Grid",
    description: "グリッドレイアウトコンポーネント",
  },
  { id: createId(), name: "Icon", description: "アイコン表示コンポーネント" },
  { id: createId(), name: "List", description: "リスト表示コンポーネント" },
  {
    id: createId(),
    name: "Modal",
    description: "モーダルウィンドウコンポーネント",
  },
  {
    id: createId(),
    name: "Pagination",
    description: "ページネーションコンポーネント",
  },
  {
    id: createId(),
    name: "Popover",
    description: "ポップオーバーコンポーネント",
  },
  {
    id: createId(),
    name: "Progress",
    description: "進捗表示のプログレスバーコンポーネント",
  },
  {
    id: createId(),
    name: "Radio",
    description: "ラジオボタンコンポーネント",
  },
  { id: createId(), name: "Slider", description: "スライダーコンポーネント" },
  {
    id: createId(),
    name: "Snackbar",
    description: "一時的なメッセージ表示のスナックバーコンポーネント",
  },
  {
    id: createId(),
    name: "Stepper",
    description: "ステップ進行コンポーネント",
  },
];

export async function seedCategories(tx: Tx): Promise<Category[]> {
  const category = await tx.query.categories.findFirst();

  if (category) {
    console.log("Categories already seeded");

    return tx.query.categories.findMany();
  }
  await tx.insert(schema.categories).values(categoriesFixture);

  return tx.query.categories.findMany();
}
