import GitHub from "next-auth/providers/github";
import type { NextAuthConfig, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { User } from "next-auth";

export default {
  pages: {
    signIn: '/login',
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session?.user) {
        (session.user as User).id = token.uid as string;
      }
      return session;
    },
    authorized: ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ['/dashboard', '/board', '/task', '/profile'];
      const isProtectedRoute = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

      if (isProtectedRoute) {
        return isLoggedIn;
      }
      return true;
    },
  }
} as NextAuthConfig;
