"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PartnerRepository_1 = require("../Reposatories/PartnerRepository");
const router = (0, express_1.Router)();
const partnerRepo = new PartnerRepository_1.PartnerRepository();
router.get("/", async (req, res) => {
    try {
        const partners = await partnerRepo.findAll();
        res.json({ data: partners });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const partner = await partnerRepo.findById(parseInt(req.params.id));
        if (!partner)
            return res.status(404).json({ message: "Partner not found" });
        res.json({ data: partner });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const partner = await partnerRepo.create(req.body);
        res.status(201).json({ data: partner });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const partner = await partnerRepo.update(parseInt(req.params.id), req.body);
        res.json({ data: partner });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await partnerRepo.delete(parseInt(req.params.id));
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
