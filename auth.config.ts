import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

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
    session: async ({ session, token }) => {
      if (session?.user) {
        (session.user as any).id = token.uid;
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
