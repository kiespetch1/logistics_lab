"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import TableForModel, { ModelOption } from "./TableForModel";

const DataAccordionItem = ({ model, label }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    // Показываем поле поиска для моделей "client" и "warehouse"
    const showSearchInput = model === "client" || model === "warehouse";

    const fetchData = async (e?: FormEvent) => {
        e?.preventDefault();
        setLoading(true);
        setError("");
        try {
            // Формируем URL с параметрами
            let url = `/api/references?model=${model}`;
            if (showSearchInput && search) {
                url += `&search=${encodeURIComponent(search)}`;
            }
            const response = await axios.get(url);
            setData(response.data);
        } catch (err: any) {
            console.error("Ошибка загрузки данных:", err);
            setError(err.response?.data?.error || err.message || "Ошибка загрузки данных");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="collapse bg-base-200">
            {/* Если нужно, чтобы открывался только один аккордеон одновременно, используем name одинаковым для всех */}
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title text-xl font-medium">{label}</div>
            <div className="collapse-content">
                <form onSubmit={fetchData} className="mb-4">
                    {showSearchInput && (
                        <input
                            type="text"
                            placeholder={
                                model === "client" ? "Введите имя клиента" : "Введите название склада"
                            }
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered w-full mb-2"
                        />
                    )}
                    <button type="submit" className="btn btn-primary">
                        Загрузить данные
                    </button>
                </form>
                {loading ? (
                    <p>Загрузка...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <TableForModel model={model} data={data} />
                )}
            </div>
        </div>
    );
};

export default DataAccordionItem;
