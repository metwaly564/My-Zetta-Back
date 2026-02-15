"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRepository = void 0;
const connection_1 = __importDefault(require("../DB/connection"));
class LeadRepository {
    async findAll() {
        return await connection_1.default.lead.findMany({
            orderBy: { createdAt: 'desc' },
            include: { service: true }
        });
    }
    async create(data) {
        return await connection_1.default.lead.create({ data });
    }
    async update(id, data) {
        return await connection_1.default.lead.update({ where: { id }, data });
    }
}
exports.LeadRepository = LeadRepository;
