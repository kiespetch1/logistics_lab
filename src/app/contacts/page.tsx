export const metadata = {
    title: 'Контакты',
};

export default function ContactsPage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="card-title text-3xl">Контакты</h1>
                    <p className="text-gray-600 mb-4">
                        Свяжитесь с нами удобным для вас способом.
                    </p>
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-xl font-bold">Офис</h2>
                            <p>ООО &quot;Пример&quot;</p>
                            <p>ул. Примерная, д. 10, офис 205</p>
                            <p>г. Москва, 123456</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Телефон</h2>
                            <p>+7 (495) 123-45-67</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Электронная почта</h2>
                            <p>
                                <a
                                    href="mailto:info@primer.ru"
                                    className="text-blue-600 hover:underline"
                                >
                                    info@primer.ru
                                </a>
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Режим работы</h2>
                            <p>Пн-Пт: 9:00 - 18:00</p>
                            <p>Сб-Вс: Выходной</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Социальные сети</h2>
                            <p>
                                <a
                                    href="https://www.facebook.com/primer"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Facebook
                                </a>{' '}
                                |{' '}
                                <a
                                    href="https://www.instagram.com/primer"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Instagram
                                </a>{' '}
                                |{' '}
                                <a
                                    href="https://www.linkedin.com/company/primer"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    LinkedIn
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
