import NextAuth, { DefaultSession, DefaultUser, ISODateString } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";
export * from "next-auth__augment";

declare module "next-auth/core/types" {
   interface Session extends DefaultSession {
        user: {
            Id: number;
            FirstName: string;
            LastName: string;
            Phone: string;
            Email: string;
            Birthday: Date;
        }
        expires: ISODateString;
    }
    interface User extends DefaultUser {
        Id: number;
        FirstName: string;
        LastName: string;
        Phone: string;
        Email: string;
        Birthday: Date;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        Id: number;
        FirstName: string;
        LastName: string;
        Phone: string;
        Email: string;
        Birthday: Date;
    }
}