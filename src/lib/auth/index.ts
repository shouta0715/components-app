import Google from "@auth/core/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/lib/client/prisma";

export const authConfig = { providers: [GitHub, Google] };

const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/",
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
} = NextAuth(authOptions);
