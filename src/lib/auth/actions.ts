"use server";

import { signIn, signOut } from "@/lib/auth";

export async function signInGitHub() {
  await signIn("github");
}

export async function signInGoogle() {
  await signIn("google");
}

export async function signOutOauth() {
  await signOut({ redirect: true });
}
