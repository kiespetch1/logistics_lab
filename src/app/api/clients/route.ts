import { NextResponse } from 'next/server';
import prisma from '~/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name') || '';

    try {
        const clients = await prisma.client.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive' as Prisma.QueryMode,
                },
            },
        });
        return NextResponse.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        return NextResponse.json({ error: 'Error fetching clients' }, { status: 500 });
    }
}
