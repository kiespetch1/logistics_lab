"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

type EntityType = "client" | "order" | "transport" | "warehouse" | "route";

// Интерфейсы для хранения справочных данных (например, для связей)
interface ClientRef {
    id: string;
    name: string;
}

interface OrderRef {
    id: string;
    cargoType: string;
}

interface TransportRef {
    id: string;
    type: string;
}

export default function CreateEntityPage() {
    const { data: session, status } = useSession();

    // Основной стейт для выбора типа
    const [entityType, setEntityType] = useState<EntityType>("client");

    // Поля для каждой сущности
    const [clientData, setClientData] = useState({
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        address: "",
    });

    const [orderData, setOrderData] = useState({
        clientId: "",
        cargoType: "",
        weight: 0,
        volume: 0,
        departureDate: "",
        deliveryDate: "",
        status: "Обрабатывается",
    });

    const [transportData, setTransportData] = useState({
        type: "",
        capacity: 0,
        vehicleNumber: "",
        status: "Доступен",
    });

    const [warehouseData, setWarehouseData] = useState({
        name: "",
        address: "",
        capacity: 0,
        currentLoad: 0,
    });

    const [routeData, setRouteData] = useState({
        orderId: "",
        transportId: "",
        startPoint: "",
        endPoint: "",
        distance: 0,
        estimatedTime: 0,
    });

    // Справочные данные для выпадающих списков (например, список клиентов, заказов и т.д.)
    const [clientRefs, setClientRefs] = useState<ClientRef[]>([]);
    const [orderRefs, setOrderRefs] = useState<OrderRef[]>([]);
    const [transportRefs, setTransportRefs] = useState<TransportRef[]>([]);

    // Загрузка справочных данных (чтобы заполнять dropdown для связей)
    useEffect(() => {
        // Пример: грузим клиентов, заказы, транспорт для связей
        async function fetchRefs() {
            try {
                const [clientsRes, ordersRes, transportRes] = await Promise.all([
                    axios.get("/api/references?model=client"),
                    axios.get("/api/references?model=order"),
                    axios.get("/api/references?model=transport"),
                ]);
                setClientRefs(clientsRes.data || []);
                setOrderRefs(ordersRes.data || []);
                setTransportRefs(transportRes.data || []);
            } catch (err) {
                console.error("Ошибка при загрузке справочных данных", err);
            }
        }
        fetchRefs();
    }, []);

    // Если сессия загружается
    if (status === "loading") {
        return <div className="p-4">Загрузка...</div>;
    }

    // Если пользователь не авторизован
    if (!session) {
        return <div className="p-4 text-red-500">Нет доступа: вы не авторизованы.</div>;
    }

    // Обработчик отправки формы
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // В зависимости от entityType отправляем разные данные
            let body: any = {};
            switch (entityType) {
                case "client":
                    body = clientData;
                    break;
                case "order":
                    body = orderData;
                    break;
                case "transport":
                    body = transportData;
                    break;
                case "warehouse":
                    body = warehouseData;
                    break;
                case "route":
                    body = routeData;
                    break;
            }
            body.entityType = entityType; // укажем тип сущности явно

            const res = await axios.post("/api/create-entity", body);
            console.log("Создан объект:", res.data);
            alert(`Успешно создан объект типа ${entityType} с ID: ${res.data.id || "?"}`);
        } catch (err: any) {
            console.error("Ошибка при создании объекта:", err);
            alert("Ошибка: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Создание объектов</h1>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                    <label className="label">
                        <span className="label-text">Выберите тип объекта</span>
                    </label>
                    <select
                        value={entityType}
                        onChange={(e) => setEntityType(e.target.value as EntityType)}
                        className="select select-bordered w-full"
                    >
                        <option value="client">Компания-клиент</option>
                        <option value="order">Заказ</option>
                        <option value="transport">Транспорт</option>
                        <option value="warehouse">Склад</option>
                        <option value="route">Путь</option>
                    </select>
                </div>

                {/* Поля для Client */}
                {entityType === "client" && (
                    <>
                        <div>
                            <label className="label">Название</label>
                            <input
                                className="input input-bordered w-full"
                                value={clientData.name}
                                onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Контактное лицо</label>
                            <input
                                className="input input-bordered w-full"
                                value={clientData.contactPerson}
                                onChange={(e) => setClientData({ ...clientData, contactPerson: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Номер телефона</label>
                            <input
                                className="input input-bordered w-full"
                                value={clientData.phone}
                                onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Эл. почта</label>
                            <input
                                className="input input-bordered w-full"
                                value={clientData.email}
                                onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Адрес</label>
                            <input
                                className="input input-bordered w-full"
                                value={clientData.address}
                                onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
                            />
                        </div>
                    </>
                )}

                {/* Поля для Order */}
                {entityType === "order" && (
                    <>
                        <div>
                            <label className="label">Компания-клиент</label>
                            <select
                                className="select select-bordered w-full"
                                value={orderData.clientId}
                                onChange={(e) => setOrderData({ ...orderData, clientId: e.target.value })}
                            >
                                <option value="">Выберите клиента</option>
                                {clientRefs.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="label">Тип груза</label>
                            <input
                                className="input input-bordered w-full"
                                value={orderData.cargoType}
                                onChange={(e) => setOrderData({ ...orderData, cargoType: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Вес</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={orderData.weight}
                                onChange={(e) => setOrderData({ ...orderData, weight: +e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Объем</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={orderData.volume}
                                onChange={(e) => setOrderData({ ...orderData, volume: +e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Дата отправления</label>
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                value={orderData.departureDate}
                                onChange={(e) => setOrderData({ ...orderData, departureDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Дата доставки</label>
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                value={orderData.deliveryDate}
                                onChange={(e) => setOrderData({ ...orderData, deliveryDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Статус</label>
                            <input
                                className="input input-bordered w-full"
                                value={orderData.status}
                                onChange={(e) => setOrderData({ ...orderData, status: e.target.value })}
                            />
                        </div>
                    </>
                )}

                {/* Поля для Transport */}
                {entityType === "transport" && (
                    <>
                        <div>
                            <label className="label">Тип</label>
                            <input
                                className="input input-bordered w-full"
                                value={transportData.type}
                                onChange={(e) => setTransportData({ ...transportData, type: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Вместительность</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={transportData.capacity}
                                onChange={(e) => setTransportData({ ...transportData, capacity: +e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Транспортный номер</label>
                            <input
                                className="input input-bordered w-full"
                                value={transportData.vehicleNumber}
                                onChange={(e) => setTransportData({ ...transportData, vehicleNumber: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Статус</label>
                            <input
                                className="input input-bordered w-full"
                                value={transportData.status}
                                onChange={(e) => setTransportData({ ...transportData, status: e.target.value })}
                            />
                        </div>
                    </>
                )}

                {/* Поля для Warehouse */}
                {entityType === "warehouse" && (
                    <>
                        <div>
                            <label className="label">Название</label>
                            <input
                                className="input input-bordered w-full"
                                value={warehouseData.name}
                                onChange={(e) => setWarehouseData({ ...warehouseData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Адрес</label>
                            <input
                                className="input input-bordered w-full"
                                value={warehouseData.address}
                                onChange={(e) => setWarehouseData({ ...warehouseData, address: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Вместимость</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={warehouseData.capacity}
                                onChange={(e) => setWarehouseData({ ...warehouseData, capacity: +e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Текущая заполненность</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={warehouseData.currentLoad}
                                onChange={(e) => setWarehouseData({ ...warehouseData, currentLoad: +e.target.value })}
                            />
                        </div>
                    </>
                )}

                {/* Поля для Route */}
                {entityType === "route" && (
                    <>
                        <div>
                            <label className="label">Заказ</label>
                            <select
                                className="select select-bordered w-full"
                                value={routeData.orderId}
                                onChange={(e) => setRouteData({ ...routeData, orderId: e.target.value })}
                            >
                                <option value="">Выберите заказ</option>
                                {orderRefs.map((o) => (
                                    <option key={o.id} value={o.id}>
                                        {o.id} ({o.cargoType})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="label">Транспорт</label>
                            <select
                                className="select select-bordered w-full"
                                value={routeData.transportId}
                                onChange={(e) => setRouteData({ ...routeData, transportId: e.target.value })}
                            >
                                <option value="">Выберите транспорт</option>
                                {transportRefs.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.type} ({t.id})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="label">Начальный пункт</label>
                            <input
                                className="input input-bordered w-full"
                                value={routeData.startPoint}
                                onChange={(e) => setRouteData({ ...routeData, startPoint: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Конечный пункт</label>
                            <input
                                className="input input-bordered w-full"
                                value={routeData.endPoint}
                                onChange={(e) => setRouteData({ ...routeData, endPoint: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Расстояние</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={routeData.distance}
                                onChange={(e) => setRouteData({ ...routeData, distance: +e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">Предополагаемое время (в минутах)</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={routeData.estimatedTime}
                                onChange={(e) => setRouteData({ ...routeData, estimatedTime: +e.target.value })}
                            />
                        </div>
                    </>
                )}

                <button type="submit" className="btn btn-primary">
                    Создать
                </button>
            </form>
        </div>
    );
}
