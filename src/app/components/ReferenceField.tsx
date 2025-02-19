"use client";

import React, {JSX} from "react";

export interface ReferenceFieldProps<T> {
    label: string; // для отображения, например, "транспорт" или "клиент"
    options: T[]; // массив опций, например, [{ id, name }]
    value: string; // текущее выбранное значение
    onChange: (value: string) => void; // обработчик изменения значения
    optionLabelField: keyof T; // имя поля для отображения (например, "name" или "type")
    optionValueField: keyof T; // имя поля для значения (обычно "id")
    addUrl: string; // URL страницы создания новой сущности
    refresh: () => Promise<void>; // функция обновления списка после закрытия popup
}

export default function ReferenceField<T extends { id: string }>({
                                                                     label,
                                                                     options,
                                                                     value,
                                                                     onChange,
                                                                     optionLabelField,
                                                                     optionValueField,
                                                                     addUrl,
                                                                     refresh,
                                                                 }: ReferenceFieldProps<T>): JSX.Element {
    const openCreatePopup = () => {
        const popup = window.open(addUrl, "CreateReference", "width=600,height=600");
        if (!popup) return; // если блокировщик всплывающих окон активен
        const timer = setInterval(() => {
            if (popup.closed) {
                clearInterval(timer);
                // Обновляем справочные данные после закрытия окна
                refresh();
            }
        }, 500);
    };

    return (
        <div className="flex gap-2 items-end">
            <select
                className="select select-bordered w-full"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">{`Выберите ${label}`}</option>
                {options.map((option) => (
                    <option
                        key={option[optionValueField] as string}
                        value={option[optionValueField] as string}
                    >
                        {option[optionLabelField] as string}
                    </option>
                ))}
            </select>
            <button type="button" className="btn btn-secondary" onClick={openCreatePopup}>
                Добавить
            </button>
        </div>
    );
}
