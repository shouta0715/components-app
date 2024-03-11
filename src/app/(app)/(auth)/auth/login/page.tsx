import { Blocks, CheckIcon, UserPlus } from "lucide-react";
import React from "react";

import {
  GitHubButton,
  GoogleButton,
} from "@/components/global/auth/server/auth-button";
import { Icon } from "@/components/icons/Icon";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getComponentCount } from "@/services/components/get/counts";
import { getUserCount } from "@/services/user/get";

const infos = [
  {
    title: "UIの閲覧",
    guest: <CheckIcon className="mx-auto h-4 w-4 text-primary" />,
    user: <CheckIcon className="mx-auto h-4 w-4 text-primary" />,
  },
  {
    title: "UIの使用",
    guest: <CheckIcon className="mx-auto h-4 w-4 text-primary" />,
    user: <CheckIcon className="mx-auto h-4 w-4 text-primary" />,
  },
  {
    title: "UIの投稿",
    guest: null,
    user: <CheckIcon className="mx-auto h-4 w-4 text-primary" />,
  },
  {
    title: "お気に入り機能",
    guest: null,
    user: <CheckIcon className="mx-auto h-4 w-4 text-primary" />,
  },
  {
    title: "いいねをする",
    guest: null,
    user: <CheckIcon className="mx-auto h-4 w-4 text-primary" />,
  },
];

export const dynamic = "error";

export default async function Page() {
  const [componentsCount, userCount] = await Promise.all([
    getComponentCount(),
    getUserCount(),
  ]);

  return (
    <div className="mx-auto grid max-w-2xl gap-12">
      <div className="grid gap-8">
        <h1 className="mx-auto flex flex-col items-center justify-center gap-4 text-6xl font-bold text-primary sm:text-7xl">
          <Icon className="h-16 sm:h-20" />
          UI TRADE
        </h1>
        <div className="grid gap-4">
          <p className="leading-7 text-muted-foreground sm:text-lg">
            コンポーネントやUIをシェアするプラットフォーム。
            あなたが作成したUIを世界中の開発者と共有しましょう。
          </p>
          <p className="leading-7 text-muted-foreground sm:text-lg">
            自分のコンポーネント他の開発者に「おすそわけ」しましょう。
            あなたが作ったUIが世界中の開発者に使われるかもしれません。
          </p>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center gap-4 sm:flex-row">
        <GitHubButton />
        <GoogleButton />
      </div>
      <div>
        <Table>
          <TableCaption>ログインするとできること</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead aria-hidden="true" />
              <TableHead className="text-center">ゲスト</TableHead>
              <TableHead className="text-center">ログインユーザー</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {infos.map((info) => (
              <TableRow key={info.title}>
                <TableCell>{info.title}</TableCell>
                <TableCell>{info.guest}</TableCell>
                <TableCell>{info.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="flex gap-4 sm:max-w-xs sm:flex-col">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-background ring-1 ring-primary/10">
            <Blocks className="h-8 w-8 text-primary" />
          </div>
          <p className=" text-primary">
            <span className="mr-2 font-bold tabular-nums">
              {componentsCount}
            </span>
            個のコンポーネントが投稿され、使用されています。
          </p>
        </div>
        <div className="flex gap-4 sm:max-w-xs sm:flex-col">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-background ring-1 ring-primary/10">
            <UserPlus className="mx-auto h-8 w-8 text-primary" />
          </div>
          <p className="text-primary">
            <span className="mr-2 font-bold tabular-nums">{userCount}</span>
            人以上のユーザーが登録しています。
          </p>
        </div>
      </div>
      <div className="mt-8 grid gap-8">
        <p className="text-center leading-7 text-muted-foreground sm:text-lg">
          あなたもコンポーネントを投稿してみませんか？
        </p>
        <div className=" flex flex-col items-center justify-center gap-4 sm:flex-row">
          <GitHubButton />
          <GoogleButton />
        </div>
      </div>
    </div>
  );
}
