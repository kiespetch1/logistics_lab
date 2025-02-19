'use client';

import { useState } from "react";
import axios from "axios";

export default function CreateOrderPage() {
    const [clientId, setClientId] = useState("");
    const [cargoType, setCargoType] = useState("");
    const [weight, setWeight] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0);
    const [departureDate, setDepartureDate] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [status, setStatus] = useState("Обрабатывается");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (
            !clientId.trim() ||
            !cargoType.trim() ||
            weight <= 0 ||
            volume <= 0 ||
            !departureDate ||
            !deliveryDate ||
            !status.trim()
        ) {
            setError("Пожалуйста, заполните все поля корректно.");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post("/api/create-entity", {
                entityType: "order",
                clientId,
                cargoType,
                weight,
                volume,
                departureDate,
                deliveryDate,
                status,
            });
            alert(`Заказ успешно создан, ID: ${res.data.id || "?"}`);
            window.close();
        } catch (err: any) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="card p-6 shadow-md bg-white w-full max-w-md">
                <h1 className="text-xl font-bold mb-4 text-center">Создание заказа</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">ID клиента</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Тип груза</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={cargoType}
                            onChange={(e) => setCargoType(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Вес</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="label">Объем</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="label">Дата отправления</label>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Дата доставки</label>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Статус</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? "Создание..." : "Создать"}
                    </button>
                </form>
            </div>
        </div>
    );
}
