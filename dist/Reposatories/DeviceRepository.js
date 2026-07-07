"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DeviceRepository {
    async findAll() {
        return prisma.device.findMany({
            include: { contract: true }
        });
    }
    async findById(id) {
        return prisma.device.findUnique({
            where: { id },
            include: { contract: true }
        });
    }
    async create(data) {
        return prisma.device.create({
            data,
            include: { contract: true }
        });
    }
    async update(id, data) {
        return prisma.device.update({
            where: { id },
            data,
            include: { contract: true }
        });
    }
}
exports.DeviceRepository = DeviceRepository;
