"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignInForm from "./SignInForm";

export default function SignInPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <div className="p-4">Загрузка...</div>;
    }

    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center">
                <SignInForm onSuccess={(callbackUrl) => router.push(callbackUrl)}/>
                <p className="py-3">или</p>
                <button className="btn btn-neutral w-full" onClick={() => router.push("/auth/register")}>К регистрации
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 text-green-500">
        Вы уже авторизованы. <br />
            <button className="btn btn-primary mt-4" onClick={() => router.push("/")}>
                Перейти на главную
            </button>
        </div>
    );
}
