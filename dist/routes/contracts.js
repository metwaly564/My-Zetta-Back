"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContractRepository_1 = require("../Reposatories/ContractRepository");
const router = (0, express_1.Router)();
const contractRepo = new ContractRepository_1.ContractRepository();
router.get("/", async (req, res) => {
    try {
        const contracts = await contractRepo.findAll();
        res.json({ data: contracts });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const contract = await contractRepo.create(req.body);
        res.status(201).json({ data: contract });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const contract = await contractRepo.update(parseInt(req.params.id), req.body);
        res.json({ data: contract });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
