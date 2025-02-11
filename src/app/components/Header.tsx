// app/components/Header.tsx
"use client";

import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";

export default function Header() {
    const {data: session, status} = useSession();

    return (
        <header className="navbar bg-base-200">
            {/* Левая часть — название */}
            <div className="flex pr-2">
                <Link href="/" className="btn btn-ghost normal-case text-xl">
                    Данные о логистике
                </Link>
            </div>

            {/* Центр — навигационные ссылки */}
            <div className="flex self-center">
                <ul className="menu menu-horizontal p-0">
                    <li>
                        <a href="/create-entity">Добавить запись</a>
                    </li>
                    <li>
                        <a href="/stats">Статистика</a>
                    </li>
                    <li>
                        <a href="/logistics">Логистические компании</a>
                    </li>
                    <li>
                        <a href="/orders">Просмотр таблиц</a>
                    </li>
                </ul>
            </div>

            {/* Правая часть — статус авторизации и кнопка */}
            <div className="flex-none ml-auto">
                {status === "loading" ? (
                    <span>Loading...</span>
                ) : session ? (
                    <div className="flex items-center gap-2">
            <span className="text-sm">
                Вы вошли как:
            </span>
                        <span className="text-sm font-bold">
              {session.user?.name || session.user?.email}
            </span>
                        <button onClick={() => signOut()} className="btn btn-primary">
                            Выйти
                        </button>
                    </div>
                ) : (
                    <button onClick={() => signIn()} className="btn btn-primary">
                        Войти
                    </button>
                )}
            </div>
        </header>
    );
}
