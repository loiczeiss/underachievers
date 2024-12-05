import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./db"




export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [Google],
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async session({ session, user, token }) {
      // Map session fields here
      return session;
    },
    async signIn({ user, account, profile }) {
      // Ensure data integrity here
      console.log(user)
      return true;
    },
  },
})