"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ServiceRepository_1 = require("../Reposatories/ServiceRepository");
const router = (0, express_1.Router)();
const serviceRepo = new ServiceRepository_1.ServiceRepository();
router.get("/", async (req, res) => {
    try {
        const services = await serviceRepo.findAll();
        res.json({ data: services });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const service = await serviceRepo.findById(parseInt(req.params.id));
        if (!service)
            return res.status(404).json({ message: "Service not found" });
        res.json({ data: service });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const service = await serviceRepo.create(req.body);
        res.status(201).json({ data: service });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const service = await serviceRepo.update(parseInt(req.params.id), req.body);
        res.json({ data: service });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await serviceRepo.delete(parseInt(req.params.id));
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
