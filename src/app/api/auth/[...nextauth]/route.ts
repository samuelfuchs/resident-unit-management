import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: AuthOptions = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  // Configure your auth providers here
  providers: [],
  // Add other NextAuth config options
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
