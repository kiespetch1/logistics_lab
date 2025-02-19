import { NextResponse } from 'next/server';
import prisma from '~/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId') || undefined;

    try {
        let transports;
        if (orderId) {
            transports = await prisma.transport.findMany({
                where: {
                    routes: {
                        some: { orderId },
                    },
                },
            });
        } else {
            transports = await prisma.transport.findMany({
                where: {
                    routes: { some: {} },
                },
            });
        }
        return NextResponse.json(transports);
    } catch (error) {
        console.error('Error fetching transports with routes:', error);
        return NextResponse.json({ error: 'Error fetching transports with routes' }, { status: 500 });
    }
}
