import { NextResponse } from 'next/server';
import prisma from '~/lib/prisma';

export async function GET(request: Request) {
    try {
        const orders = await prisma.order.findMany({
            include: {
                client: {
                    select: { name: true },
                },
            },
        });
        return NextResponse.json(orders);
    } catch (error: any) {
        console.error("Ошибка при получении заказов:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
