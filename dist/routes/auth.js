"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = require("../Reposatories/UserRepository");
const router = (0, express_1.Router)();
const userRepo = new UserRepository_1.UserRepository();
const JWT_SECRET = process.env.JWT_SECRET || 'zeta-secret-key-2026';
router.post("/signup", async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const existingUser = await userRepo.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await userRepo.create({
            email,
            password: hashedPassword,
            name,
            role: role || 'ADMIN'
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json({ data: { user: userWithoutPassword, token } });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userRepo.findByEmail(email);
        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user;
        res.json({ data: { user: userWithoutPassword, token } });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
