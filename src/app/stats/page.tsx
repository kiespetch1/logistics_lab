"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Stats {
    userCount: number;
    clientCount: number;
    orderCount: number;
    transportCount: number;
    warehouseCount: number;
    routeCount: number;
    totalOrderWeight: number;
    averageOrderWeight: number;
    totalOrderVolume: number;
}

export default function StatsPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchStats = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("/api/stats");
            setStats(response.data);
        } catch (err: any) {
            console.error("Ошибка при получении статистики:", err);
            setError(err.response?.data?.error || err.message || "Ошибка при получении статистики");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Статистика базы данных</h1>
            <button onClick={fetchStats} className="btn btn-primary mb-4">
                Обновить
            </button>
            {loading && <p>Загрузка...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {stats && (
                <div className="grid grid-cols-1 gap-4">
                    <p>Пользователей: {stats.userCount}</p>
                    <p>Клиентов: {stats.clientCount}</p>
                    <p>Заказов: {stats.orderCount}</p>
                    <p>Транспортных средств: {stats.transportCount}</p>
                    <p>Складов: {stats.warehouseCount}</p>
                    <p>Маршрутов: {stats.routeCount}</p>
                    <p>Общий вес заказов: {stats.totalOrderWeight} кг</p>
                    <p>Средний вес заказа: {stats.averageOrderWeight.toFixed(2)} кг</p>
                    <p>Общий объём заказов: {stats.totalOrderVolume} м³</p>
                </div>
            )}
        </div>
    );
}
