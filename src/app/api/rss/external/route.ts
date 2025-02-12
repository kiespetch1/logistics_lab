import { NextResponse } from 'next/server';
import prisma from '~/lib/prisma';

export async function GET() {
    try {
        const feeds = await prisma.externalFeed.findMany();
        return NextResponse.json(feeds);
    } catch (error) {
        console.error('Ошибка получения источников:', error);
        return NextResponse.json({ error: 'Ошибка получения источников' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { feedUrl } = await request.json();
        if (!feedUrl || typeof feedUrl !== 'string') {
            return NextResponse.json({ error: 'Неверный feedUrl' }, { status: 400 });
        }

        // Проверка валидности URL
        try {
            new URL(feedUrl);
        } catch (err) {
            return NextResponse.json({ error: 'Неверный формат URL' }, { status: 400 });
        }

        // Добавляем источник в БД
        const newFeed = await prisma.externalFeed.create({
            data: { feedUrl },
        });
        return NextResponse.json(newFeed, { status: 201 });
    } catch (error) {
        console.error('Ошибка добавления источника:', error);
        return NextResponse.json({ error: 'Ошибка добавления источника' }, { status: 500 });
    }
}
