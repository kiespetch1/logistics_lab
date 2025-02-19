'use client';

import { useState } from "react";
import axios from "axios";

export default function CreateTransportPage() {
    const [type, setType] = useState("");
    const [capacity, setCapacity] = useState<number>(0);
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [status, setStatus] = useState("Доступен");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (!type.trim() || capacity <= 0 || !vehicleNumber.trim()) {
            setError("Пожалуйста, заполните все поля корректно.");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post("/api/create-entity", {
                entityType: "transport",
                type,
                capacity,
                vehicleNumber,
                status,
            });
            alert(`Транспорт успешно создан, ID: ${res.data.id || "?"}`);
            // Закрываем всплывающее окно
            window.close();
        } catch (err: any) {
            console.error("Ошибка создания транспорта:", err);
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="card p-6 shadow-md bg-base-100 w-full max-w-md">
                <h1 className="text-xl font-bold mb-4 text-center">Создание транспорта</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">Тип</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Вместительность</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={capacity}
                            onChange={(e) => setCapacity(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="label">Транспортный номер</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
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
