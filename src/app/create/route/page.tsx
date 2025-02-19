'use client';

import { useState } from "react";
import axios from "axios";

export default function CreateRoutePage() {
    const [orderId, setOrderId] = useState("");
    const [transportId, setTransportId] = useState("");
    const [startPoint, setStartPoint] = useState("");
    const [endPoint, setEndPoint] = useState("");
    const [distance, setDistance] = useState<number>(0);
    const [estimatedTime, setEstimatedTime] = useState<number>(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (!orderId.trim() || !transportId.trim() || !startPoint.trim() || !endPoint.trim() || distance <= 0 || estimatedTime <= 0) {
            setError("Пожалуйста, заполните все поля корректно.");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post("/api/create-entity", {
                entityType: "route",
                orderId,
                transportId,
                startPoint,
                endPoint,
                distance,
                estimatedTime,
            });
            alert(`Маршрут успешно создан, ID: ${res.data.id || "?"}`);
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
                <h1 className="text-xl font-bold mb-4 text-center">Создание маршрута</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">ID заказа</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">ID транспорта</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={transportId}
                            onChange={(e) => setTransportId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Начальный пункт</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={startPoint}
                            onChange={(e) => setStartPoint(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Конечный пункт</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={endPoint}
                            onChange={(e) => setEndPoint(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Расстояние</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={distance}
                            onChange={(e) => setDistance(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="label">Предполагаемое время (в минутах)</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={estimatedTime}
                            onChange={(e) => setEstimatedTime(Number(e.target.value))}
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
