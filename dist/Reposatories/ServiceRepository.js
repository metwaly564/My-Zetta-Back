"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRepository = void 0;
const connection_1 = __importDefault(require("../DB/connection"));
class ServiceRepository {
    async findAll() {
        return await connection_1.default.service.findMany({
            include: {
                features: true,
                benefits: true,
            },
        });
    }
    async findById(id) {
        return await connection_1.default.service.findUnique({
            where: { id },
            include: {
                features: true,
                benefits: true,
            },
        });
    }
    async create(data) {
        const { features, benefits, ...serviceData } = data;
        return await connection_1.default.service.create({
            data: {
                ...serviceData,
                features: {
                    create: features,
                },
                benefits: {
                    create: benefits,
                },
            },
            include: {
                features: true,
                benefits: true,
            },
        });
    }
    async update(id, data) {
        const { features, benefits, ...serviceData } = data;
        return await connection_1.default.service.update({
            where: { id },
            data: {
                ...serviceData,
                // For simplicity in this initial implementation, we're not handling complex feature/benefit updates
            },
            include: {
                features: true,
                benefits: true,
            },
        });
    }
    async delete(id) {
        await connection_1.default.service.delete({ where: { id } });
    }
}
exports.ServiceRepository = ServiceRepository;
