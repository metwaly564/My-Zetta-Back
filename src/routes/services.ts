import { Router, Request, Response } from "express";
import { ServiceRepository } from "../Reposatories/ServiceRepository";

const router = Router();
const serviceRepo = new ServiceRepository();

router.get("/", async (req: Request, res: Response) => {
    try {
        const services = await serviceRepo.findAll();
        res.json({ data: services });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const service = await serviceRepo.findById(parseInt(req.params.id as string));
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.json({ data: service });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const service = await serviceRepo.create(req.body);
        res.status(201).json({ data: service });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const service = await serviceRepo.update(parseInt(req.params.id as string), req.body);
        res.json({ data: service });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        await serviceRepo.delete(parseInt(req.params.id as string));
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
