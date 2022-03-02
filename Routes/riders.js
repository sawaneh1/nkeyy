import express from "express";
import { getRiders } from "../Controllers/rider.js";

const router = express.Router();

router.get("/api/riders", getRiders);

export default router;
