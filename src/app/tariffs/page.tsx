"use client";

interface Tariff {
    name: string;
    description: string;
    price: number;
    effectiveDate: string;
}

const staticTariffs: Tariff[] = [
    {
        name: "Экспресс-доставка",
        description:
            "Быстрая доставка грузов в течение 24 часов по Московскому региону с гарантией своевременной доставки.",
        price: 1500,
        effectiveDate: "2023-01-01T00:00:00.000Z",
    },
    {
        name: "Стандартная доставка",
        description:
            "Доставка грузов в течение 3-5 рабочих дней по всей России с оптимальным соотношением цены и скорости.",
        price: 800,
        effectiveDate: "2023-01-01T00:00:00.000Z",
    },
    {
        name: "Экономичная доставка",
        description:
            "Доставка грузов с минимальными затратами, срок доставки до 7 рабочих дней.",
        price: 500,
        effectiveDate: "2023-01-01T00:00:00.000Z",
    },
    {
        name: "Международная доставка",
        description:
            "Доставка грузов за рубеж с таможенным оформлением, срок 5-10 рабочих дней.",
        price: 3500,
        effectiveDate: "2023-02-01T00:00:00.000Z",
    },
    {
        name: "Складское хранение",
        description:
            "Аренда складских площадей с кондиционированием и круглосуточной охраной для безопасного хранения грузов.",
        price: 2000,
        effectiveDate: "2023-03-01T00:00:00.000Z",
    },
    {
        name: "Таможенное оформление",
        description:
            "Полный спектр услуг по таможенному оформлению грузов, включая подготовку документов и консультации.",
        price: 1200,
        effectiveDate: "2023-04-01T00:00:00.000Z",
    },
    // Можно добавить больше тарифов, чтобы таблица была насыщенной
];

export default function TariffsPage() {
    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Тарифы логистической компании
                </h1>
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Название тарифа</th>
                            <th className="border p-2">Описание</th>
                            <th className="border p-2">Цена (₽)</th>
                            <th className="border p-2">Дата начала</th>
                        </tr>
                        </thead>
                        <tbody>
                        {staticTariffs.map((tariff) => (
                            <tr key={crypto.randomUUID()} className="hover:bg-gray-100">
                                <td className="border p-2">{tariff.name}</td>
                                <td className="border p-2">{tariff.description}</td>
                                <td className="border p-2">{tariff.price}</td>
                                <td className="border p-2">
                                    {new Date(tariff.effectiveDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
