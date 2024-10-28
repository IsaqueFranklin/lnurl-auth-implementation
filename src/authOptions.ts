// authOptions.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "lightning",
      name: "lightning",
      credentials: {
        pubkey: { label: "pubkey", type: "text" },
        k1: { label: "k1", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { k1, pubkey } = credentials;

        // Returning user object with an 'id' property
        return { id: k1, pubkey }; 
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.key = user.pubkey; // Add pubkey to the token
        token.k1 = user.k1; // Add k1 to the token
      }
      return token;
    },
    async session({ session, token }:any) {
      if (token.key) {
        session.user.pubkey = token.key; // Add pubkey to session
      }
      if (token.k1) {
        session.user.k1 = token.k1; // Add k1 to session
      }
      return session;
    },
    async redirect({ url }:any) {
      // Redirect to root URL after signing in
      return url.split("/signin")[0];
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for signing the JWT
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
  jwt: {
    // Remove signingKey and just keep secret
    secret: process.env.JWT_SIGNING_PRIVATE_KEY || process.env.NEXTAUTH_SECRET, // Use this for signing
  },
};