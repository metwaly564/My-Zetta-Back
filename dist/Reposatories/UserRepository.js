"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const connection_1 = __importDefault(require("../DB/connection"));
class UserRepository {
    async findByEmail(email) {
        return await connection_1.default.user.findUnique({ where: { email } });
    }
    async create(data) {
        return await connection_1.default.user.create({ data });
    }
}
exports.UserRepository = UserRepository;
