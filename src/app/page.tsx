// src/app/page.tsx
"use client";

export default function Home() {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">
                Добро пожаловать на сайт о логистике!
            </h1>
            <p className="mb-4">
                Наш сайт предназначен для специалистов в области логистики, перевозок, управления
                складами и оптимизации цепочек поставок, а также для всех, кто интересуется современными
                тенденциями в сфере доставки и транспортировки.
            </p>
            <p className="mb-4">
                Здесь вы найдете актуальную информацию, аналитические материалы, статистику и инструменты для
                управления логистическими процессами.
            </p>
            <p className="mb-4">
                Технологическая основа сайта построена с использованием <strong>Next.js</strong> (App Router,
                React, TypeScript) для создания динамичного и отзывчивого интерфейса, а также{' '}
                <strong>Prisma</strong> для работы с базой данных <strong>PostgreSQL</strong> и <strong>MySQL</strong>.
                Система
                авторизации реализована через <strong>NextAuth</strong>, что обеспечивает безопасный доступ к
                защищённым разделам.
            </p>
            <p className="mb-4">
                Данный сайт был сделан студентом группы ИВТ-Б21 Егором Черемисиновым.
            </p>
            <p>
                Для продолжения выберите пункт из меню выше.
            </p>
        </div>
    );
}
