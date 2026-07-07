"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ContractRepository {
    async findAll() {
        return prisma.contract.findMany({
            include: { user: true, devices: true, extraServices: true, invoices: true }
        });
    }
    async findById(id) {
        return prisma.contract.findUnique({
            where: { id },
            include: { user: true, devices: true, extraServices: true, invoices: true }
        });
    }
    async create(data) {
        return prisma.contract.create({
            data,
            include: { user: true, devices: true, extraServices: true, invoices: true }
        });
    }
    async update(id, data) {
        return prisma.contract.update({
            where: { id },
            data,
            include: { user: true, devices: true, extraServices: true, invoices: true }
        });
    }
}
exports.ContractRepository = ContractRepository;
