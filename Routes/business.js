import express from "express";
import { getBusiness } from "../Controllers/business.js";

const router = express.Router();

router.get("/api/business", getBusiness);

export default router;
