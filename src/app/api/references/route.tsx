// app/api/references/route.ts
import { NextResponse } from "next/server";
import prisma from "~/lib/prisma"; // Проверьте правильность пути к вашему prisma

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const model = searchParams.get("model");

        switch (model) {
            case "client": {
                const clients = await prisma.client.findMany({
                    select: { id: true, name: true },
                });
                return NextResponse.json(clients);
            }
            case "order": {
                const orders = await prisma.order.findMany({
                    select: { id: true, cargoType: true },
                });
                return NextResponse.json(orders);
            }
            case "transport": {
                const transports = await prisma.transport.findMany({
                    select: { id: true, type: true },
                });
                return NextResponse.json(transports);
            }
            default:
                return NextResponse.json({ error: "Unknown model" }, { status: 400 });
        }
    } catch (error: any) {
        console.error("Ошибка в API /api/references:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
