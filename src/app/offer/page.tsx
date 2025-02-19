// src/app/offer/page.tsx
export default function OfferPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold">О нас</h1>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-grow container bg-base-100 mx-auto px-4 py-8">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Целевая аудитория</h2>
                    <p className="mb-4">
                        Наш сайт предназначен для специалистов в области логистики, управления перевозками, складской логистики и оптимизации цепочек поставок, а также для компаний, стремящихся повысить эффективность своих процессов.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Наши услуги</h2>
                    <p className="mb-4">
                        Мы предлагаем комплексные логистические решения для малого, среднего и крупного бизнеса. Наши услуги включают:
                    </p>
                    <ul className="list-disc ml-6">
                        <li>Международные и внутренние перевозки грузов</li>
                        <li>Складскую логистику и распределение</li>
                        <li>Оптимизацию маршрутов и транспортировку</li>
                        <li>Таможенное оформление и документационное сопровождение</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">Условия сотрудничества</h2>
                    <p className="mb-4">
                        При заключении договора вы получаете индивидуальный подход, конкурентные цены и высокую оперативность. Мы гарантируем:
                    </p>
                    <ul className="list-disc ml-6">
                        <li>Надёжность и безопасность перевозок</li>
                        <li>Контроль и мониторинг каждого этапа доставки</li>
                        <li>Круглосуточную поддержку специалистов</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">Контактная информация</h2>
                    <p className="mb-2">
                        Для получения подробной информации о наших услугах и условиях сотрудничества свяжитесь с нами:
                    </p>
                    <p>Телефон: +7 (495) 123-45-67</p>
                    <p className="mb-1">Черемисинов Егор</p>
                    <p className="mb-1">Email: info@logistics-company.ru</p>
                    <p>Адрес: ул. Логистическая, д. 10, Москва, Россия</p>
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-blue-600 text-white p-4 text-center">
                <div className="container mx-auto">
                    <p>&copy; {new Date().getFullYear()} Логистическая компания. Все права защищены.</p>
                </div>
            </footer>
        </div>
    );
}
