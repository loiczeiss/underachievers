import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";

import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),

  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  ...authConfig,

  callbacks: {
    async session({ session }) {
      // Map session fields here

      return session;
    },
    async signIn({ user }) {
      // Ensure data integrity here
      console.log(user)
      return true;
    },
  },
})