import GitHub from "next-auth/providers/github"

import type { NextAuthConfig } from "next-auth"

export default {
    providers: [
        GitHub({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
      ],
} satisfies NextAuthConfig