'use client';

import { useState } from "react";
import axios from "axios";

export default function CreateClientPage() {
    const [name, setName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (!name.trim() || !contactPerson.trim() || !phone.trim() || !email.trim() || !address.trim()) {
            setError("Пожалуйста, заполните все поля");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post("/api/create-entity", {
                entityType: "client",
                name,
                contactPerson,
                phone,
                email,
                address,
            });
            alert(`Клиент успешно создан, ID: ${res.data.id || "?"}`);
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
                <h1 className="text-xl font-bold mb-4 text-center">Создание клиента</h1>
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
                        <label className="label">Контактное лицо</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Телефон</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? "Создание..." : "Создать"}
                    </button>
                </form>
            </div>
        </div>
    );
}
