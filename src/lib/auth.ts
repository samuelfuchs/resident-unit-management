import { DefaultSession, AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { doLogin } from "@/api/auth";

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
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await doLogin(
            credentials.email,
            credentials.password
          );
          if (response.user) {
            return {
              id: response.user._id,
              email: response.user.email,
              name: response.user.name,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
};
