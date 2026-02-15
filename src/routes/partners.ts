import { Router, Request, Response } from "express";
import { PartnerRepository } from "../Reposatories/PartnerRepository";

const router = Router();
const partnerRepo = new PartnerRepository();

router.get("/", async (req: Request, res: Response) => {
    try {
        const partners = await partnerRepo.findAll();
        res.json({ data: partners });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const partner = await partnerRepo.findById(parseInt(req.params.id as string));
        if (!partner) return res.status(404).json({ message: "Partner not found" });
        res.json({ data: partner });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const partner = await partnerRepo.create(req.body);
        res.status(201).json({ data: partner });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const partner = await partnerRepo.update(parseInt(req.params.id as string), req.body);
        res.json({ data: partner });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        await partnerRepo.delete(parseInt(req.params.id as string));
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
