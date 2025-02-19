'use client';

import { useState } from "react";
import axios from "axios";

export default function CreateWarehousePage() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [capacity, setCapacity] = useState<number>(0);
    const [currentLoad, setCurrentLoad] = useState<number>(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (!name.trim() || !address.trim() || capacity <= 0) {
            setError("Пожалуйста, заполните все поля корректно.");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post("/api/create-entity", {
                entityType: "warehouse",
                name,
                address,
                capacity,
                currentLoad,
            });
            alert(`Склад успешно создан, ID: ${res.data.id || "?"}`);
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
                <h1 className="text-xl font-bold mb-4 text-center">Создание склада</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">Название</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Адрес</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Вместимость</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={capacity}
                            onChange={(e) => setCapacity(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="label">Текущая заполненность</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={currentLoad}
                            onChange={(e) => setCurrentLoad(Number(e.target.value))}
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
