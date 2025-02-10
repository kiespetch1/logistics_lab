import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { compare } from "bcryptjs";
import type { User as PrismaUser } from "@prisma/client"; // Импортируем тип пользователя из Prisma

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text", placeholder: "your-email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Проверяем, что введены email и пароль
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                // Находим пользователя по email
                const user = await prisma.user.findUnique({
                    where: { email: credentials.username },
                });

                // Приводим тип полученного объекта к PrismaUser
                const prismaUser = user as PrismaUser | null;

                // Если пользователь не найден или у него нет поля password, выбрасываем ошибку
                if (!prismaUser || !prismaUser.password) {
                    throw new Error("No user found with the given email");
                }

                // Сравниваем введённый пароль с сохранённым хэшем
                const isValid = await compare(credentials.password, prismaUser.password);
                if (!isValid) {
                    throw new Error("Incorrect password");
                }

                // Если всё в порядке – возвращаем объект пользователя
                return prismaUser;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/signin", // Путь к кастомной странице входа
    },
};
