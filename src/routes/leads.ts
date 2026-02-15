import { Router, Request, Response } from "express";
import { LeadRepository } from "../Reposatories/LeadRepository";

const router = Router();
const leadRepo = new LeadRepository();

router.get("/", async (req: Request, res: Response) => {
    try {
        const leads = await leadRepo.findAll();
        res.json({ data: leads });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const lead = await leadRepo.create(req.body);
        res.status(201).json({ data: lead });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
