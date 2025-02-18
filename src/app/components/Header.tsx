"use client";

import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";
import YandexSearch from "@/app/components/YandexSearch";

export default function Header() {
    const {data: session, status} = useSession();

    return (
        <header className="navbar bg-base-200 z-20">
            <div className="flex pr-2">
                <Link href="/" className="btn btn-ghost normal-case text-xl">
                    Данные о логистике
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <div className="dropdown dropdown-hover dropdown-bottom flex">
                        <label tabIndex={0} className="cursor-pointer py-2 px-4">База данных</label>
                        <ul tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li>
                                <Link href="/create-entity">Добавить запись</Link>
                            </li>
                            <li>
                                <Link href="/stats">Статистика</Link>
                            </li>
                            <li>
                                <Link href="/tables">Просмотр таблиц</Link>
                            </li>
                        </ul>
                    </div>
                    <li>
                        <Link href="/logistics">Логистические компании</Link>
                    </li>
                    <li>
                        <Link href="/feed">RSS-фид</Link>
                    </li>
                    <li>
                        <Link href="/widgets">Виджеты</Link>
                    </li>
                    <li>
                        <Link href="/articles">Статьи</Link>
                    </li>
                    <li>
                        <Link href="/contacts">Контакты</Link>
                    </li>
                </ul>
            </div>

            <div className="flex-none ml-auto">
                <YandexSearch/>

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
