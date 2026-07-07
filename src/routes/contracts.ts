import { Router, Request, Response } from "express";
import { ContractRepository } from "../Reposatories/ContractRepository";

const router = Router();
const contractRepo = new ContractRepository();

router.get("/", async (req: Request, res: Response) => {
    try {
        const contracts = await contractRepo.findAll();
        res.json({ data: contracts });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const contract = await contractRepo.create(req.body);
        res.status(201).json({ data: contract });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const contract = await contractRepo.update(parseInt(req.params.id as string), req.body);
        res.json({ data: contract });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
