"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparisonRepository = void 0;
const connection_1 = __importDefault(require("../DB/connection"));
class ComparisonRepository {
    async log(data) {
        return await connection_1.default.comparisonLog.create({ data });
    }
    async findAll() {
        return await connection_1.default.comparisonLog.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
}
exports.ComparisonRepository = ComparisonRepository;
