import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ContractRepository {
    async findAll() {
        return prisma.contract.findMany({
            include: { user: true, devices: true, extraServices: true, invoices: true }
        });
    }

    async findById(id: number) {
        return prisma.contract.findUnique({
            where: { id },
            include: { user: true, devices: true, extraServices: true, invoices: true }
        });
    }

    async create(data: any) {
        return prisma.contract.create({
            data,
            include: { user: true, devices: true, extraServices: true, invoices: true }
        });
    }

    async update(id: number, data: any) {
        return prisma.contract.update({
            where: { id },
            data,
            include: { user: true, devices: true, extraServices: true, invoices: true }
        });
    }
}
