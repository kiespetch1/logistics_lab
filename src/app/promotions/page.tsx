"use client";

interface Promotion {
    id: string;
    title: string;
    description: string;
    validFrom: string;
    validTo: string;
    promoCode?: string;
}

const promotions: Promotion[] = [
    {
        id: "promo-001",
        title: "Скидка 20% на экспресс-доставку",
        description:
            "Получите 20% скидку на экспресс-доставку грузов по Московскому региону. Акция действует до конца месяца.",
        validFrom: "2024-04-01T00:00:00.000Z",
        validTo: "2024-04-30T23:59:59.000Z",
        promoCode: "EXPRESS20",
    },
    {
        id: "promo-002",
        title: "Бесплатное таможенное оформление",
        description:
            "При заказе международной доставки мы предоставляем бесплатное таможенное оформление для вашего груза. Акция действует при заказе от 5 000 ₽.",
        validFrom: "2024-05-01T00:00:00.000Z",
        validTo: "2024-05-31T23:59:59.000Z",
    },
    {
        id: "promo-003",
        title: "Складское хранение со скидкой 15%",
        description:
            "Арендуйте складские площади с 15% скидкой на первые 3 месяца сотрудничества. Предложение ограничено по времени.",
        validFrom: "2024-06-01T00:00:00.000Z",
        validTo: "2024-06-30T23:59:59.000Z",
        promoCode: "STORAGE15",
    },
];

export default function PromotionsPage() {
    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Акции и предложения</h1>
                {promotions.map((promo) => (
                    <div
                        key={promo.id}
                        className="card w-full bg-base-100 shadow-md rounded-lg mb-6 p-6 border border-gray-200"
                    >
                        <h2 className="text-2xl font-semibold mb-2">{promo.title}</h2>
                        <p className="mb-4">{promo.description}</p>
                        <p className="text-sm text-base-content">
                            Действует с {new Date(promo.validFrom).toLocaleDateString()} до{" "}
                            {new Date(promo.validTo).toLocaleDateString()}
                        </p>
                        {promo.promoCode && (
                            <p className="mt-2 text-lg font-bold text-blue-600">
                                Промокод: {promo.promoCode}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
