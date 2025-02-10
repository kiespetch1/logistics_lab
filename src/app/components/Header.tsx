// app/components/Header.tsx
"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession();

    return (
        <header className="navbar bg-base-200">
            {/* Левая часть — название */}
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost normal-case text-xl">
                    Данные о логистике
                </Link>
            </div>

            {/* Центр — навигационные ссылки */}
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li>
                        <a href="#">Раздел 1</a>
                    </li>
                    <li>
                        <a href="#">Раздел 2</a>
                    </li>
                    <li>
                        <a href="#">Раздел 3</a>
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
              {session.user?.name || session.user?.email}
            </span>
                        <button onClick={() => signOut()} className="btn btn-sm">
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button onClick={() => signIn()} className="btn btn-sm">
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
}
