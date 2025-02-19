import { NextResponse } from 'next/server';
import prisma from '~/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId') || undefined;
    const transportId = searchParams.get('transportId') || undefined;

    try {
        const routes = await prisma.route.findMany({
            where: {
                ...(orderId ? { orderId } : {}),
                ...(transportId ? { transportId } : {}),
            },
            include: {
                order: true,
                transport: true,
            },
        });
        return NextResponse.json(routes);
    } catch (error) {
        console.error('Error fetching routes:', error);
        return NextResponse.json({ error: 'Error fetching routes' }, { status: 500 });
    }
}
