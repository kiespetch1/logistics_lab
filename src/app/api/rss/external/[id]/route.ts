import { NextResponse } from 'next/server';
import prisma from '~/lib/prisma';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        await prisma.externalFeed.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Источник удалён' });
    } catch (error) {
        console.error('Ошибка удаления источника:', error);
        return NextResponse.json({ error: 'Ошибка удаления источника' }, { status: 500 });
    }
}
