"use client";

import YandexMetric from "@/app/components/YandexMetric";

export default function Footer() {
    return (
        <footer className="footer items-center p-4 bg-base-200 text-base-content">
            <div>
                <p>© 2025</p>
            </div>
            <div className="flex flex-row items-center md:place-self-center md:justify-self-end">
                <YandexMetric/>
                <small className="pl-2">Данные о логистике</small>
            </div>
        </footer>
    );
}
