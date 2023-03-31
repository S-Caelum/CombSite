import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import VkProvider from "next-auth/providers/vk";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "email-login",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "yoao21" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email && !password) {
          throw new Error("Не введены данные учётной записи!");
        } else if (!password) {
          throw new Error("Не введён пароль учётной записи!");
        } else if (!email) {
          throw new Error("Не введён адрес электронной почты!");
        }
        const res = await fetch(
          "http://localhost:3000/api/auth/auth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        const user = await res.json();

        if (res.status == 401) {
          throw new Error("Неверные данные авторизации");
        } else if (res.status == 200) {
          return {
            Id: user.Id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Phone: user.Phone,
            Email: user.Email,
          };
        }
      },
    }),
    VkProvider({
      id: "vk-login",
      clientId: process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.Id = token.Id;
        session.user.FirstName = token.FirstName;
        session.user.LastName = token.LastName;
        session.user.Phone = token.Phone;
        session.user.BirthDay = token.BirthDay;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.Id = user.Id;
        token.FirstName = user.FirstName;
        token.LastName = user.LastName;
        token.Phone = user.Phone;
        token.BirthDay = user.BirthDay;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/authorization",
  },
};

export default NextAuth(authOptions);