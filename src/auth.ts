import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client, { connectDB } from "./lib/db"
import authConfig from '@/auth.config'
import { getUserById } from "./data/user";
import User from "./models/user";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }){
            await connectDB();
            const updatedUser = await User.findOneAndUpdate({_id: user.id}, { emailVerified: new Date(), role: "user", isOAuth: true }, {new: true});
        }
    },
    callbacks: {
        async signIn({ user, account }){

            console.log({
                user,
                account,
            })

            if(account?.provider !== "credentials") return true;

            // ** Prevent Signin without email verification
            const existingUser = await getUserById(user.id);
            if(!existingUser?.emailVerified) return false;

            return true;
        },
        async session({ token, session }){
            
            if(token.sub && token.role){
                session.user.id = token.sub;
                session.user.role = token.role;
            }

            if(session.user){
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        async jwt({ token }){

            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            token.isOAuth = existingUser.isOAuth;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;

            return token;
        },
    },
    adapter: MongoDBAdapter(client),
    session: { strategy: "jwt" },
    ...authConfig,
})