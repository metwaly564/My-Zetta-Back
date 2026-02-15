"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerRepository = void 0;
const connection_1 = __importDefault(require("../DB/connection"));
class PartnerRepository {
    async findAll() {
        return await connection_1.default.partner.findMany({
            orderBy: { rank: 'asc' },
        });
    }
    async findById(id) {
        return await connection_1.default.partner.findUnique({ where: { id } });
    }
    async create(data) {
        return await connection_1.default.partner.create({ data });
    }
    async update(id, data) {
        return await connection_1.default.partner.update({ where: { id }, data });
    }
    async delete(id) {
        await connection_1.default.partner.delete({ where: { id } });
    }
}
exports.PartnerRepository = PartnerRepository;
