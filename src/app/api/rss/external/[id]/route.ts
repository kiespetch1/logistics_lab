import { NextResponse, NextRequest } from 'next/server';
import prisma from '~/lib/prisma';

export async function DELETE(
    request: NextRequest,
    context: any
) {
    const { params } = context;
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    try {
        await prisma.externalFeed.delete({ where: { id } });
        return NextResponse.json({ message: 'Источник удалён' });
    } catch (error) {
        return NextResponse.json({ error: 'Ошибка удаления источника' }, { status: 500 });
    }
}
