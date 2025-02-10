// app/api/create-entity/route.ts
import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
        }

        // Парсим тело запроса
        const body = await req.json();
        const { entityType } = body;
        let created;

        switch (entityType) {
            case "client":
                created = await prisma.client.create({
                    data: {
                        name: body.name,
                        contactPerson: body.contactPerson,
                        phone: body.phone,
                        email: body.email,
                        address: body.address,
                    },
                });
                break;
            case "order":
                created = await prisma.order.create({
                    data: {
                        clientId: body.clientId,
                        cargoType: body.cargoType,
                        weight: Number(body.weight),
                        volume: Number(body.volume),
                        departureDate: new Date(body.departureDate),
                        deliveryDate: body.deliveryDate ? new Date(body.deliveryDate) : null,
                        status: body.status,
                    },
                });
                break;
            case "transport":
                created = await prisma.transport.create({
                    data: {
                        type: body.type,
                        capacity: Number(body.capacity),
                        vehicleNumber: body.vehicleNumber,
                        status: body.status,
                    },
                });
                break;
            case "warehouse":
                created = await prisma.warehouse.create({
                    data: {
                        name: body.name,
                        address: body.address,
                        capacity: Number(body.capacity),
                        currentLoad: Number(body.currentLoad),
                    },
                });
                break;
            case "route":
                created = await prisma.route.create({
                    data: {
                        orderId: body.orderId,
                        transportId: body.transportId,
                        startPoint: body.startPoint,
                        endPoint: body.endPoint,
                        distance: Number(body.distance),
                        estimatedTime: Number(body.estimatedTime),
                    },
                });
                break;
            default:
                return NextResponse.json({ error: "Неизвестный тип сущности" }, { status: 400 });
        }

        return NextResponse.json(created, { status: 201 });
    } catch (error: any) {
        console.error("Ошибка при создании сущности:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
