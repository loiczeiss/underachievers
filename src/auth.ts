import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './db';

import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),

  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  ...authConfig,

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
