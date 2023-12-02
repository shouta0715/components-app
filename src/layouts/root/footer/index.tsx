import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="mt-10 border-t bg-background text-primary">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="mb-8 grid grid-cols-2 gap-y-8 md:grid-cols-3">
          <p className="text-center text-xs leading-5 ">
            <Link className=" inline-block text-xs  underline" href="/terms">
              利用規約
            </Link>
          </p>
          <p className="text-center text-xs leading-5 ">
            <Link className=" inline-block text-xs  underline" href="/privacy">
              プライバシーポリシー
            </Link>
          </p>
          <p className="text-center text-xs leading-5 ">
            <a
              className=" inline-block text-xs  underline"
              href="https://forms.gle/GMzgLTw6FA8S6jjS9"
              rel="noreferrer"
              target="_blank"
            >
              お問い合わせへ
            </a>
          </p>
          <p className="text-center text-xs leading-5 ">
            <Link className=" inline-block text-xs  underline" href="/data">
              支払いに関して
            </Link>
          </p>
        </div>
        <div className="md:items-center md:justify-between">
          <p className="text-center text-xs leading-5 ">テスト</p>
          <p className="mt-1 text-center text-xs leading-5 ">
            下記はサイト独自の内容に関する著作権を示すものです。
          </p>
          <div className="mt-6">
            <p className="text-center text-xs leading-5 ">
              &copy; {new Date().getFullYear()}
              <a
                className="inline-block px-1 text-sm text-destructive underline "
                href="https://twitter.com/shoutapu0715"
              >
                shouta
              </a>
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
