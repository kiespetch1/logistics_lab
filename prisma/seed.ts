import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function seedUsers() {
    const userCount = await prisma.user.count();
    if (userCount > 0) {
        console.log('User table is not empty. Skipping user seeding.');
        return;
    }

    const passwordHash = await hash('testpassword', 10);
    const user = await prisma.user.create({
        data: {
            name: 'Пользователь 1',
            email: 'test@example.com',
            password: passwordHash,
        },
    });

    console.log('User seeded:', user);
}

async function seedClients() {
    const clientCount = await prisma.client.count();
    if (clientCount > 0) {
        console.log('Client table is not empty. Skipping client seeding.');
        return;
    }

    const clientsData = [
        {
            name: 'Компания А',
            contactPerson: 'Иван Иванов',
            phone: '1234567890',
            email: 'clientA@example.com',
            address: 'ул. Ленина, 1',
        },
        {
            name: 'Компания Б',
            contactPerson: 'Петр Петров',
            phone: '0987654321',
            email: 'clientB@example.com',
            address: 'ул. Советская, 2',
        },
        {
            name: 'Компания В',
            contactPerson: 'Сидор Сидоров',
            phone: '5555555555',
            email: 'clientC@example.com',
            address: 'ул. Мира, 3',
        },
    ];

    const clients = await Promise.all(
        clientsData.map(data => prisma.client.create({ data }))
    );
    console.log('Clients seeded:', clients);
}

async function seedOrders() {
    const orderCount = await prisma.order.count();
    if (orderCount > 0) {
        console.log('Order table is not empty. Skipping order seeding.');
        return;
    }

    const clients = await prisma.client.findMany();
    if (clients.length === 0) {
        console.log("No clients found. Skipping order seeding.");
        return;
    }

    const ordersData = [];
    for (const client of clients) {
        ordersData.push({
            clientId: client.id,
            cargoType: 'perishable',
            weight: 100,
            volume: 2,
            departureDate: new Date(),
            deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // через 2 дня
            status: 'Обрабатывается',
        });
        ordersData.push({
            clientId: client.id,
            cargoType: 'dangerous',
            weight: 200,
            volume: 3,
            departureDate: new Date(),
            deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // через 3 дня
            status: 'Обрабатывается',
        });
    }

    const orders = await Promise.all(
        ordersData.map(data => prisma.order.create({ data }))
    );
    console.log('Orders seeded:', orders);
}

async function seedTransport() {
    const transportCount = await prisma.transport.count();
    if (transportCount > 0) {
        console.log('Transport table is not empty. Skipping transport seeding.');
        return;
    }

    const transportsData = [
        {
            type: 'Грузовик',
            capacity: 10,
            vehicleNumber: 'TR-001',
            status: 'Доступно',
        },
        {
            type: 'Поезд',
            capacity: 50,
            vehicleNumber: 'TRN-002',
            status: 'Доступно',
        },
        {
            type: 'Судно',
            capacity: 100,
            vehicleNumber: 'SHP-003',
            status: 'Доступно',
        },
    ];

    const transports = await Promise.all(
        transportsData.map(data => prisma.transport.create({ data }))
    );
    console.log('Transports seeded:', transports);
}

async function seedWarehouse() {
    const warehouseCount = await prisma.warehouse.count();
    if (warehouseCount > 0) {
        console.log('Warehouse table is not empty. Skipping warehouse seeding.');
        return;
    }

    const warehousesData = [
        {
            name: 'Главный склад',
            address: 'ул. Складская, 10',
            capacity: 500,
            currentLoad: 100,
        },
        {
            name: 'Вторичный склад',
            address: 'ул. Запасная, 5',
            capacity: 300,
            currentLoad: 50,
        },
    ];

    const warehouses = await Promise.all(
        warehousesData.map(data => prisma.warehouse.create({ data }))
    );
    console.log('Warehouses seeded:', warehouses);
}

async function seedRoutes() {
    const routeCount = await prisma.route.count();
    if (routeCount > 0) {
        console.log('Route table is not empty. Skipping route seeding.');
        return;
    }

    const orders = await prisma.order.findMany();
    const transports = await prisma.transport.findMany();

    if (orders.length === 0 || transports.length === 0) {
        console.log('Insufficient orders or transports. Skipping route seeding.');
        return;
    }

    const routesData = orders.map(order => {
        const randomTransport = transports[Math.floor(Math.random() * transports.length)];
        return {
            orderId: order.id,
            transportId: randomTransport.id,
            startPoint: 'Москва',
            endPoint: 'Санкт-Петербург',
            distance: 250,
            estimatedTime: 180,
        };
    });

    const routes = await Promise.all(
        routesData.map(data => prisma.route.create({ data }))
    );
    console.log('Routes seeded:', routes);
}

async function main() {
    await seedUsers();
    await seedClients();
    await seedOrders();
    await seedTransport();
    await seedWarehouse();
    await seedRoutes();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
