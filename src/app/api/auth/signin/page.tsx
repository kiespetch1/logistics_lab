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

    // Если пользователь не авторизован, отображаем форму входа
    if (!session) {
        return (
            <div className="flex items-center justify-center">
                <SignInForm onSuccess={(callbackUrl) => router.push(callbackUrl)} />
            </div>
        );
    }

    // Если пользователь уже авторизован, можно отобразить сообщение или перенаправить его
    return (
        <div className="p-4 text-green-500">
            Вы уже авторизованы. <br />
            <button className="btn btn-primary mt-4" onClick={() => router.push("/")}>
                Перейти на главную
            </button>
        </div>
    );
}
