import { DrizzleAdapter } from "@auth/drizzle-adapter";

import NextAuth, { NextAuthConfig } from "next-auth";
import { authConfig } from "@/lib/auth/config";
import { drizzle } from "@/lib/client/drizzle";

const authOptions: NextAuthConfig = {
  adapter: DrizzleAdapter(drizzle),
  session: { strategy: "jwt" },
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    async session({ token, user: _, session }) {
      const newSession = { ...session };
      if (token && token.sub) {
        newSession.user = { ...newSession.user, id: token.sub };
      }

      return newSession;
    },
  },
  ...authConfig,
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
