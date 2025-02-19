import { NextResponse } from 'next/server';
import prisma from '~/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const transportId = searchParams.get('transportId') || undefined;
    const volumeParam = searchParams.get('volume') || undefined;
    const weightParam = searchParams.get('weight') || undefined;

    // Преобразуем volume/weight к числу, если они заданы
    const volume = volumeParam ? Number(volumeParam) : undefined;
    const weight = weightParam ? Number(weightParam) : undefined;

    try {
        let orders;

        if (transportId) {
            // 1) Если есть transportId — фильтруем строго по нему (игнорируем volume/weight)
            orders = await prisma.order.findMany({
                where: {
                    routes: {
                        some: { transportId },
                    },
                },
            });
        } else if (volume !== undefined || weight !== undefined) {
            // 2) Если есть volume/weight — фильтруем по ним + заказы должны иметь маршруты
            orders = await prisma.order.findMany({
                where: {
                    routes: { some: {} }, // у заказа должны быть маршруты
                    ...(volume !== undefined ? { volume } : {}),
                    ...(weight !== undefined ? { weight } : {}),
                },
            });
        } else {
            // 3) Без параметров — вернуть все заказы, у которых вообще есть маршруты
            orders = await prisma.order.findMany({
                where: {
                    routes: { some: {} },
                },
            });
        }

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders with routes:', error);
        return NextResponse.json(
            { error: 'Error fetching orders with routes' },
            { status: 500 },
        );
    }
}
