"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

// Интерфейсы сущностей
interface Client {
    id: string;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    address: string;
}

interface Warehouse {
    id: string;
    name: string;
    address: string;
    capacity: number;
    currentLoad: number;
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

interface Route {
    id: string;
    orderId: string;
    transportId: string;
    startPoint: string;
    endPoint: string;
    distance: number;
    estimatedTime: number;
}

interface Transport {
    id: string;
    type: string;
    capacity: number;
    vehicleNumber: string;
    status: string;
}

export default function DbQueriesPage() {
    /* ===== Запрос 1: Поиск клиентов по названию ===== */
    const [clientSearch, setClientSearch] = useState("");
    const [clients, setClients] = useState<Client[]>([]);
    const [clientLoading, setClientLoading] = useState(false);
    const [clientError, setClientError] = useState("");

    const handleClientSearch = async (e: FormEvent) => {
        e.preventDefault();
        setClientLoading(true);
        setClientError("");
        try {
            const res = await axios.get(
                `/api/clients?name=${encodeURIComponent(clientSearch)}`
            );
            setClients(res.data);
        } catch (err: any) {
            setClientError(
                err.response?.data?.error || err.message || "Ошибка загрузки клиентов"
            );
        } finally {
            setClientLoading(false);
        }
    };

    /* ===== Запрос 2: Поиск складов по названию ===== */
    const [warehouseSearch, setWarehouseSearch] = useState("");
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [warehouseLoading, setWarehouseLoading] = useState(false);
    const [warehouseError, setWarehouseError] = useState("");

    const handleWarehouseSearch = async (e: FormEvent) => {
        e.preventDefault();
        setWarehouseLoading(true);
        setWarehouseError("");
        try {
            const res = await axios.get(
                `/api/warehouses?name=${encodeURIComponent(warehouseSearch)}`
            );
            setWarehouses(res.data);
        } catch (err: any) {
            setWarehouseError(
                err.response?.data?.error ||
                err.message ||
                "Ошибка загрузки складов"
            );
        } finally {
            setWarehouseLoading(false);
        }
    };

    /* ===== Запрос 3: Поиск заказов по объёму и массе ===== */
    const [volume, setVolume] = useState("");
    const [weight, setWeight] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState("");

    const handleOrderSearch = async (e: FormEvent) => {
        e.preventDefault();
        setOrderLoading(true);
        setOrderError("");
        try {
            let url = `/api/routes/orders?`;
            const params = [];
            if (volume) params.push(`volume=${volume}`);
            if (weight) params.push(`weight=${weight}`);
            url += params.join("&");
            const res = await axios.get(url);
            setOrders(res.data);
        } catch (err: any) {
            setOrderError(
                err.response?.data?.error ||
                err.message ||
                "Ошибка загрузки заказов"
            );
        } finally {
            setOrderLoading(false);
        }
    };

    /* ===== Запрос 4: Поиск маршрутов по заказу и транспорту ===== */
    const [routeOrderId, setRouteOrderId] = useState("");
    const [routeTransportId, setRouteTransportId] = useState("");

    const [routes, setRoutes] = useState<Route[]>([]);
    const [routeLoading, setRouteLoading] = useState(false);
    const [routeError, setRouteError] = useState("");

    // Данные для зависимых выпадающих списков
    const [routeOrders, setRouteOrders] = useState<Order[]>([]);
    const [routeTransports, setRouteTransports] = useState<Transport[]>([]);

    // Получаем заказы (с фильтром по transportId, если он задан)
    const fetchRouteOrders = async (transportId?: string) => {
        try {
            let url = `/api/routes/orders`;
            if (transportId) {
                url += `?transportId=${transportId}`;
            }
            const res = await axios.get(url);
            setRouteOrders(res.data);
        } catch (err) {
            console.error("Ошибка загрузки заказов с маршрутами", err);
        }
    };

    // Получаем транспорт (с фильтром по orderId, если он задан)
    const fetchRouteTransports = async (orderId?: string) => {
        try {
            let url = `/api/routes/transports`;
            if (orderId) {
                url += `?orderId=${orderId}`;
            }
            const res = await axios.get(url);
            setRouteTransports(res.data);
        } catch (err) {
            console.error("Ошибка загрузки транспорта с маршрутами", err);
        }
    };

    // При монтировании компонента — загружаем все (без фильтра)
    useEffect(() => {
        fetchRouteOrders();
        fetchRouteTransports();
    }, []);

    // При смене выбранного заказа фильтруем транспорт
    useEffect(() => {
        if (routeOrderId) {
            fetchRouteTransports(routeOrderId);
        } else {
            // Если заказ не выбран — возвращаем весь транспорт
            fetchRouteTransports();
        }
    }, [routeOrderId]);

    // При смене выбранного транспорта фильтруем заказы
    useEffect(() => {
        if (routeTransportId) {
            fetchRouteOrders(routeTransportId);
        } else {
            // Если транспорт не выбран — возвращаем все заказы
            fetchRouteOrders();
        }
    }, [routeTransportId]);

    const handleRouteSearch = async (e: FormEvent) => {
        e.preventDefault();
        setRouteLoading(true);
        setRouteError("");
        try {
            let url = `/api/routes/route?`;
            const params = [];
            if (routeOrderId) params.push(`orderId=${routeOrderId}`);
            if (routeTransportId) params.push(`transportId=${routeTransportId}`);
            url += params.join("&");
            const res = await axios.get(url);
            setRoutes(res.data);
        } catch (err: any) {
            setRouteError(
                err.response?.data?.error ||
                err.message ||
                "Ошибка загрузки маршрутов"
            );
        } finally {
            setRouteLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold text-center mb-8">
                Запросы к базе данных логистической компании
            </h1>

            {/* ===== Аккордеон 1: Поиск клиентов по названию ===== */}
            <div className="collapse bg-base-200">
                <input type="radio" name="accordion" />
                <div className="collapse-title text-xl font-medium">
                    Поиск клиентов по названию
                </div>
                <div className="collapse-content">
                    <form onSubmit={handleClientSearch} className="mb-4">
                        <input
                            type="text"
                            placeholder="Введите имя клиента"
                            value={clientSearch}
                            onChange={(e) => setClientSearch(e.target.value)}
                            className="input input-bordered w-full mb-2"
                        />
                        <button type="submit" className="btn btn-primary">
                            Искать клиентов
                        </button>
                    </form>
                    {clientLoading ? (
                        <p>Загрузка...</p>
                    ) : clientError ? (
                        <p className="text-red-500">{clientError}</p>
                    ) : clients.length > 0 ? (
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
                            {clients.map((client) => (
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
                    ) : (
                        <p>Нет данных для отображения</p>
                    )}
                </div>
            </div>

            {/* ===== Аккордеон 2: Поиск складов по названию ===== */}
            <div className="collapse bg-base-200">
                <input type="radio" name="accordion" />
                <div className="collapse-title text-xl font-medium">
                    Поиск складов по названию
                </div>
                <div className="collapse-content">
                    <form onSubmit={handleWarehouseSearch} className="mb-4">
                        <input
                            type="text"
                            placeholder="Введите название склада"
                            value={warehouseSearch}
                            onChange={(e) => setWarehouseSearch(e.target.value)}
                            className="input input-bordered w-full mb-2"
                        />
                        <button type="submit" className="btn btn-primary">
                            Искать склады
                        </button>
                    </form>
                    {warehouseLoading ? (
                        <p>Загрузка...</p>
                    ) : warehouseError ? (
                        <p className="text-red-500">{warehouseError}</p>
                    ) : warehouses.length > 0 ? (
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
                            {warehouses.map((wh) => (
                                <tr key={wh.id}>
                                    <td>{wh.id}</td>
                                    <td>{wh.name}</td>
                                    <td>{wh.address}</td>
                                    <td>{wh.capacity}</td>
                                    <td>{wh.currentLoad}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Нет данных для отображения</p>
                    )}
                </div>
            </div>

            {/* ===== Аккордеон 3: Поиск заказов по объёму и массе ===== */}
            <div className="collapse bg-base-200">
                <input type="radio" name="accordion" />
                <div className="collapse-title text-xl font-medium">
                    Поиск заказов по объёму и массе
                </div>
                <div className="collapse-content">
                    <form onSubmit={handleOrderSearch} className="mb-4 flex flex-col gap-2">
                        <input
                            type="number"
                            placeholder="Объём"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="number"
                            placeholder="Масса"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <button type="submit" className="btn btn-primary">
                            Искать заказы
                        </button>
                    </form>
                    {orderLoading ? (
                        <p>Загрузка...</p>
                    ) : orderError ? (
                        <p className="text-red-500">{orderError}</p>
                    ) : orders.length > 0 ? (
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
                            {orders.map((order) => (
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
                    ) : (
                        <p>Нет данных для отображения</p>
                    )}
                </div>
            </div>

            {/* ===== Аккордеон 4: Поиск маршрутов по заказу и транспорту ===== */}
            <div className="collapse bg-base-200">
                <input type="radio" name="accordion" />
                <div className="collapse-title text-xl font-medium">
                    Поиск маршрутов по заказу и транспорту
                </div>
                <div className="collapse-content">
                    <form onSubmit={handleRouteSearch} className="mb-4 flex flex-col gap-2">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Заказы с маршрутами
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={routeOrderId}
                                    onChange={(e) => {
                                        setRouteOrderId(e.target.value);
                                        setRouteTransportId(""); // сбрасываем транспорт при смене заказа
                                    }}
                                >
                                    <option value="">-- Выберите заказ --</option>
                                    {routeOrders.map((order) => (
                                        <option key={order.id} value={order.id}>
                                            {order.cargoType} (ID: {order.id})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Транспорт с маршрутами
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={routeTransportId}
                                    onChange={(e) => setRouteTransportId(e.target.value)}
                                >
                                    <option value="">-- Выберите транспорт --</option>
                                    {routeTransports.map((transport) => (
                                        <option key={transport.id} value={transport.id}>
                                            {transport.vehicleNumber} ({transport.type})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Искать маршруты
                        </button>
                    </form>
                    {routeLoading ? (
                        <p>Загрузка...</p>
                    ) : routeError ? (
                        <p className="text-red-500">{routeError}</p>
                    ) : routes.length > 0 ? (
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
                            {routes.map((route) => (
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
                    ) : (
                        <p>Нет данных для отображения</p>
                    )}
                </div>
            </div>
        </div>
    );
}
