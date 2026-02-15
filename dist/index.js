"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const services_1 = __importDefault(require("./routes/services"));
const partners_1 = __importDefault(require("./routes/partners"));
const leads_1 = __importDefault(require("./routes/leads"));
const compare_1 = __importDefault(require("./routes/compare"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
dotenv_1.default.config();
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
// Error handling middleware
app.use(errorMiddleware_1.default);
app.listen(PORT, () => {
    console.log(`Zetta Backend is running on http://localhost:${PORT}`);
});
