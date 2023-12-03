import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/config";

export const runtime = "experimental-edge";

export const { auth: middleware } = NextAuth(authConfig);
