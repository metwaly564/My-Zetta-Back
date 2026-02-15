import { Router, Request, Response } from "express";
import { ComparisonRepository } from "../Reposatories/ComparisonRepository";

const router = Router();
const comparisonRepo = new ComparisonRepository();

router.get("/", async (req: Request, res: Response) => {
    try {
        const logs = await comparisonRepo.findAll();
        res.json({ data: logs });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const { type, data } = req.body;

        // In a real scenario, this would involve complex logic or file processing
        // For now, we'll log the input and mock a result if it's manual

        let resultData = {};
        if (type === 'manual') {
            const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
            const currentCost = parseFloat(parsedData.current_cost) || 0;
            const proposedCost = parseFloat(parsedData.proposed_cost) || 0;
            const currentDevices = parseInt(parsedData.current_devices) || 0;
            const proposedDevices = parseInt(parsedData.proposed_devices) || 0;
            const contractLength = parseInt(parsedData.contract_length) || 36;

            const annualSavings = (currentCost - proposedCost) * Math.min(currentDevices, proposedDevices);
            const totalSavings = annualSavings * (contractLength / 12);

            resultData = {
                annual_savings: annualSavings,
                total_savings_over_contract: totalSavings,
                roi_percentage: 35, // Mocked
                payback_period_months: 12, // Mocked
            };
        }

        const log = await comparisonRepo.log({
            type,
            inputData: data,
            resultData
        });

        res.status(201).json({ data: log });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
