import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import {db} from "@/db"

const  AUTH_GOOGLE_ID  = process.env.AUTH_GOOGLE_ID as string
const AUTH_GOOGLE_SECRET = process.env.AUTH_GOOGLE_SECRET as string

export const {
    handlers: { GET, POST },
    auth,
    signOut,
    signIn,
  } = NextAuth({
  providers: [
   GoogleProvider ({
      clientId:AUTH_GOOGLE_ID,
      clientSecret:AUTH_GOOGLE_SECRET,
    }),
  ],
  adapter: PrismaAdapter(db),
 
})