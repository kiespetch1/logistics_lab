// app/api/stats/route.ts
import { NextResponse } from "next/server";
import prisma from "~/lib/prisma"; // убедитесь, что путь правильный

export async function GET(request: Request) {
    try {
        // Подсчитываем количество объектов для каждой сущности
        const userCount = await prisma.user.count();
        const clientCount = await prisma.client.count();
        const orderCount = await prisma.order.count();
        const transportCount = await prisma.transport.count();
        const warehouseCount = await prisma.warehouse.count();
        const routeCount = await prisma.route.count();

        // Получаем данные заказов для дополнительных метрик (например, общий вес и объём)
        const orders = await prisma.order.findMany({
            select: { weight: true, volume: true },
        });

        const totalOrderWeight = orders.reduce((sum, order) => sum + order.weight, 0);
        const averageOrderWeight = orders.length > 0 ? totalOrderWeight / orders.length : 0;
        const totalOrderVolume = orders.reduce((sum, order) => sum + order.volume, 0);

        const stats = {
            userCount,
            clientCount,
            orderCount,
            transportCount,
            warehouseCount,
            routeCount,
            totalOrderWeight,
            averageOrderWeight,
            totalOrderVolume,
        };

        return NextResponse.json(stats);
    } catch (error: any) {
        console.error("Ошибка при получении статистики:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
