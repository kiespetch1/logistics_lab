"use client";

import { useState, useEffect } from "react";
import axios from "axios";

type ModelOption = "client" | "order" | "transport" | "warehouse" | "route";

interface Client {
    id: string;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    address: string;
}

interface Order {
    id: string;
    clientId: string;
    cargoType: string;
    weight: number;
    volume: number;
    departureDate: string;
    deliveryDate?: string | null;
    status: string;
}

interface Transport {
    id: string;
    type: string;
    capacity: number;
    vehicleNumber: string;
    status: string;
}

interface Warehouse {
    id: string;
    name: string;
    address: string;
    capacity: number;
    currentLoad: number;
}

interface Route {
    id: string;
    orderId: string;
    transportId: string;
    startPoint: string;
    endPoint: string;
    distance: number;
    estimatedTime: number;
}

export default function DataPage() {
    const [selectedOption, setSelectedOption] = useState<ModelOption>("client");
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`/api/references?model=${selectedOption}`);
            setData(response.data);
        } catch (err: any) {
            console.error("Ошибка загрузки данных:", err);
            setError(err.response?.data?.error || err.message || "Ошибка загрузки данных");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setData([]);
    }, [selectedOption]);

    const renderTable = () => {
        if (!data || data.length === 0) return <p>Нет данных для отображения.</p>;

        switch (selectedOption) {
            case "client":
                return (
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Контактное лицо</th>
                            <th>Телефон</th>
                            <th>Email</th>
                            <th>Адрес</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(data as Client[]).map((client) => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.name}</td>
                                <td>{client.contactPerson}</td>
                                <td>{client.phone}</td>
                                <td>{client.email}</td>
                                <td>{client.address}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );

            case "order":
                return (
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID Клиента</th>
                            <th>Тип груза</th>
                            <th>Масса</th>
                            <th>Объём</th>
                            <th>Дата отправки</th>
                            <th>Дата доставки</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(data as Order[]).map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.clientId}</td>
                                <td>{order.cargoType}</td>
                                <td>{order.weight}</td>
                                <td>{order.volume}</td>
                                <td>{new Date(order.departureDate).toLocaleDateString()}</td>
                                <td>
                                    {order.deliveryDate
                                        ? new Date(order.deliveryDate).toLocaleDateString()
                                        : "-"}
                                </td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );

            case "transport":
                return (
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Тип</th>
                            <th>Грузоподъемность</th>
                            <th>Номер ТС</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(data as Transport[]).map((transport) => (
                            <tr key={transport.id}>
                                <td>{transport.id}</td>
                                <td>{transport.type}</td>
                                <td>{transport.capacity}</td>
                                <td>{transport.vehicleNumber}</td>
                                <td>{transport.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );

            case "warehouse":
                return (
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Адрес</th>
                            <th>Вместимость</th>
                            <th>Текущая загрузка</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(data as Warehouse[]).map((warehouse) => (
                            <tr key={warehouse.id}>
                                <td>{warehouse.id}</td>
                                <td>{warehouse.name}</td>
                                <td>{warehouse.address}</td>
                                <td>{warehouse.capacity}</td>
                                <td>{warehouse.currentLoad}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );

            case "route":
                return (
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID Заказа</th>
                            <th>ID Транспорта</th>
                            <th>Начало</th>
                            <th>Конец</th>
                            <th>Расстояние</th>
                            <th>Время в пути</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(data as Route[]).map((route) => (
                            <tr key={route.id}>
                                <td>{route.id}</td>
                                <td>{route.orderId}</td>
                                <td>{route.transportId}</td>
                                <td>{route.startPoint}</td>
                                <td>{route.endPoint}</td>
                                <td>{route.distance}</td>
                                <td>{route.estimatedTime} мин</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );

            default:
                return <p>Неизвестная категория</p>;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-136px)]">
            <h1 className="text-3xl font-bold py-6">Просмотр данных БД логистической компании</h1>
            <div className="p-4 flex flex-col items-center w-full max-w-4xl">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Выберите категорию
                    </label>
                    <select
                        className="select select-bordered w-full"
                        value={selectedOption}
                        onChange={(e) => {
                            setSelectedOption(e.target.value as ModelOption);
                            setData([]);
                        }}
                    >
                        <option value="client">Клиенты</option>
                        <option value="order">Заказы</option>
                        <option value="transport">Транспорт</option>
                        <option value="warehouse">Склады</option>
                        <option value="route">Маршруты</option>
                    </select>
                </div>
                <button className="btn btn-primary mb-4" onClick={fetchData}>
                    Загрузить данные
                </button>
                {loading ? (
                    <p>Загрузка...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    renderTable()
                )}
            </div>
        </div>
    );
}
