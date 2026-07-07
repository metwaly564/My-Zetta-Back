import { Router, Request, Response } from "express";
import { DeviceRepository } from "../Reposatories/DeviceRepository";

const router = Router();
const deviceRepo = new DeviceRepository();

router.get("/", async (req: Request, res: Response) => {
    try {
        const devices = await deviceRepo.findAll();
        res.json({ data: devices });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const device = await deviceRepo.create(req.body);
        res.status(201).json({ data: device });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const device = await deviceRepo.update(parseInt(req.params.id as string), req.body);
        res.json({ data: device });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
