"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeadRepository_1 = require("../Reposatories/LeadRepository");
const router = (0, express_1.Router)();
const leadRepo = new LeadRepository_1.LeadRepository();
router.get("/", async (req, res) => {
    try {
        const leads = await leadRepo.findAll();
        res.json({ data: leads });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const lead = await leadRepo.create(req.body);
        res.status(201).json({ data: lead });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
