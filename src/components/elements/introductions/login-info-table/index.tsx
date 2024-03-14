import { CheckIcon } from "lucide-react";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export function LoginInfoTable() {
  return (
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
  );
}
