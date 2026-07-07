"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DeviceRepository_1 = require("../Reposatories/DeviceRepository");
const router = (0, express_1.Router)();
const deviceRepo = new DeviceRepository_1.DeviceRepository();
router.get("/", async (req, res) => {
    try {
        const devices = await deviceRepo.findAll();
        res.json({ data: devices });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const device = await deviceRepo.create(req.body);
        res.status(201).json({ data: device });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const device = await deviceRepo.update(parseInt(req.params.id), req.body);
        res.json({ data: device });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
