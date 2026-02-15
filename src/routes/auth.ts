import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../Reposatories/UserRepository";

const router = Router();
const userRepo = new UserRepository();
const JWT_SECRET = process.env.JWT_SECRET || 'zeta-secret-key-2026';

router.post("/signup", async (req: Request, res: Response) => {
    try {
        const { email, password, name, role } = req.body;

        const existingUser = await userRepo.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepo.create({
            email,
            password: hashedPassword,
            name,
            role: role || 'ADMIN'
        });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user as any;
        res.status(201).json({ data: { user: userWithoutPassword, token } });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/signin", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await userRepo.findByEmail(email);
        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user as any;
        res.json({ data: { user: userWithoutPassword, token } });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
