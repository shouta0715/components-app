import { LogOutIcon } from "lucide-react";
import React from "react";

import { GitHubIcon } from "@/components/icons/GitHub";
import { GoogleIcon } from "@/components/icons/Google";
import { Button } from "@/components/ui/button";

import { signInGitHub, signInGoogle, signOutOauth } from "@/lib/auth/actions";

export function SignOutButton() {
  return (
    <form action={signOutOauth}>
      <button
        className="flex w-full items-center gap-x-2 text-sm"
        type="submit"
      >
        <LogOutIcon className="inline-block h-4 w-4" />
        <span>ログアウト</span>
      </button>
    </form>
  );
}

export const GitHubButton = () => {
  return (
    <form action={signInGitHub}>
      <Button className="flex w-max gap-x-3 font-semibold" variant="outline">
        <GitHubIcon />
        <span className="px-4">GitHubでログイン</span>
      </Button>
    </form>
  );
};

export const GoogleButton = () => {
  return (
    <form action={signInGoogle}>
      <Button className="flex w-max gap-x-3 font-semibold" variant="outline">
        <GoogleIcon />
        <span className="px-4">Googleでログイン</span>
      </Button>
    </form>
  );
};
