import { FirestoreAdapter } from "@auth/firebase-adapter";
import NextAuth from "next-auth";
import { firebaseCert } from "./firebase";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: FirestoreAdapter({
        credential: firebaseCert,
    }),
    providers: [Google],
    // JWT evita consultar o Firestore (sessão + usuário) a cada chamada de auth(),
    // que acontece no layout, na página e em cada server action.
    session: { strategy: "jwt" },
    events: {},
    callbacks: {
        session({ session, token }) {
            if (token.sub && session.user) session.user.id = token.sub;
            return session;
        },
    },
});
