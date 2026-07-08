import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// =======================
// CLIENTS
// =======================
router.get("/clients", async (req, res) => {
  try {
    const clients = await prisma.client.findMany({ include: { sites: true } });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

router.post("/clients", async (req, res) => {
  try {
    const client = await prisma.client.create({ data: req.body });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: "Failed to create client" });
  }
});

// =======================
// SITES
// =======================
router.get("/sites", async (req, res) => {
  try {
    const sites = await prisma.site.findMany({ include: { client: true } });
    res.json(sites);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sites" });
  }
});

router.post("/sites", async (req, res) => {
  try {
    const site = await prisma.site.create({ data: req.body });
    res.json(site);
  } catch (err) {
    res.status(500).json({ error: "Failed to create site" });
  }
});

// =======================
// WAREHOUSES
// =======================
router.get("/warehouses", async (req, res) => {
  try {
    const warehouses = await prisma.warehouse.findMany();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch warehouses" });
  }
});

router.post("/warehouses", async (req, res) => {
  try {
    const warehouse = await prisma.warehouse.create({ data: req.body });
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ error: "Failed to create warehouse" });
  }
});

// =======================
// ASSETS
// =======================
router.get("/assets", async (req, res) => {
  try {
    const assets = await prisma.asset.findMany({ include: { warehouse: true, site: true } });
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch assets" });
  }
});

router.post("/assets", async (req, res) => {
  try {
    const asset = await prisma.asset.create({ data: req.body });
    res.json(asset);
  } catch (err) {
    res.status(500).json({ error: "Failed to create asset" });
  }
});

// =======================
// ASSET CATEGORIES
// =======================
router.get("/asset-categories", async (req, res) => {
  try {
    const categories = await prisma.assetCategory.findMany();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch asset categories" });
  }
});

export default router;
