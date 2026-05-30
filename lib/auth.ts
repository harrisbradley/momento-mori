import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import Nodemailer from "next-auth/providers/nodemailer";
import { db } from "./firebase";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: FirestoreAdapter({ firestore: db }),
  providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST ?? "localhost",
        port: Number(process.env.EMAIL_SERVER_PORT ?? 1025),
        auth: undefined,
      },
      from: process.env.EMAIL_FROM ?? "noreply@momento-mo.rip",
    }),
  ],
  pages: {
    signIn: "/signin",
    verifyRequest: "/verify",
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
