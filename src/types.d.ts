import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt"

export type ExtendedUser = DefaultSession["user"] & {
    role: "admin" | "user";
    isOAuth: boolean;
}

declare module "next-auth"{
    interface Session {
        user: ExtendedUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
      role?: "admin" | "user"
    }
}