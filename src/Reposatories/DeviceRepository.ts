import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeviceRepository {
    async findAll() {
        return prisma.device.findMany({
            include: { contract: true }
        });
    }

    async findById(id: number) {
        return prisma.device.findUnique({
            where: { id },
            include: { contract: true }
        });
    }

    async create(data: any) {
        return prisma.device.create({
            data,
            include: { contract: true }
        });
    }

    async update(id: number, data: any) {
        return prisma.device.update({
            where: { id },
            data,
            include: { contract: true }
        });
    }
}
