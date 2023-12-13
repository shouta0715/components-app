import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import { authConfig } from "@/lib/auth/config";
import { prisma } from "@/lib/client/prisma";

const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
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
