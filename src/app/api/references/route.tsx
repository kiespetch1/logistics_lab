import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const model = searchParams.get("model");

        switch (model) {
            case "client": {
                const clients = await prisma.client.findMany({
                    select: { id: true, name: true, contactPerson: true, phone: true, email: true, address: true },
                });
                return NextResponse.json(clients);
            }
            case "order": {
                const orders = await prisma.order.findMany({
                    select: {
                        id: true,
                        clientId: true,
                        cargoType: true,
                        weight: true,
                        volume: true,
                        departureDate: true,
                        deliveryDate: true,
                        status: true
                    },
                });
                return NextResponse.json(orders);
            }
            case "transport": {
                // Выбираем поля транспорта
                const transports = await prisma.transport.findMany({
                    select: { id: true, type: true, capacity: true, vehicleNumber: true, status: true },
                });
                return NextResponse.json(transports);
            }
            case "warehouse": {
                // Выбираем поля склада
                const warehouses = await prisma.warehouse.findMany({
                    select: { id: true, name: true, address: true, capacity: true, currentLoad: true },
                });
                return NextResponse.json(warehouses);
            }
            case "route": {
                // Выбираем поля маршрута
                const routes = await prisma.route.findMany({
                    select: { id: true, orderId: true, transportId: true, startPoint: true, endPoint: true, distance: true, estimatedTime: true },
                });
                return NextResponse.json(routes);
            }
            default:
                return NextResponse.json({ error: "Unknown model" }, { status: 400 });
        }
    } catch (error: any) {
        console.error("Ошибка в API /api/references:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
