import NextAuth, { DefaultSession, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/core/types" {
   interface Session {
        user: {
            Id: number;
            FirstName: string;
            LastName: string;
            Phone: string;
            BirthDay: Date
        }
        expires: ISODateString;
    }
    interface User {
        Id: number;
        FirstName: string;
        LastName: string;
        Phone: string;
        BirthDay: Date
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        Id: number;
        FirstName: string;
        LastName: string;
        Phone: string;
        BirthDay: Date
    }
}