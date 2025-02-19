import { NextResponse } from 'next/server';
import prisma from '~/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name') || '';

    try {
        const warehouses = await prisma.warehouse.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive' as Prisma.QueryMode,
                },
            },
        });
        return NextResponse.json(warehouses);
    } catch (error) {
        console.error('Error fetching warehouses:', error);
        return NextResponse.json({ error: 'Error fetching warehouses' }, { status: 500 });
    }
}
