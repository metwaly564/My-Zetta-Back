"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const services_1 = __importDefault(require("./routes/services"));
const partners_1 = __importDefault(require("./routes/partners"));
const leads_1 = __importDefault(require("./routes/leads"));
const compare_1 = __importDefault(require("./routes/compare"));
const auth_1 = __importDefault(require("./routes/auth"));
const contracts_1 = __importDefault(require("./routes/contracts"));
const devices_1 = __importDefault(require("./routes/devices"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.use('/api/services', services_1.default);
app.use('/api/partners', partners_1.default);
app.use('/api/leads', leads_1.default);
app.use('/api/compare', compare_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/contracts', contracts_1.default);
app.use('/api/devices', devices_1.default);
// Error handling middleware
app.use(errorMiddleware_1.default);
app.listen(PORT, async () => {
    console.log(`Zetta Backend is running on http://localhost:${PORT}`);
    // Diagnostic check
    if (!process.env.DATABASE_URL) {
        console.error('CRITICAL: DATABASE_URL is not defined in environment variables.');
    }
    else {
        try {
            const prisma = (await Promise.resolve().then(() => __importStar(require('./DB/connection')))).default;
            await prisma.$connect();
            console.log('✅ Database connected successfully.');
        }
        catch (error) {
            console.error('❌ Database connection failed:', error.message);
        }
    }
});
