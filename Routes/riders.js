import express from "express";
import {
  deleterider,
  getRider,
  getRiders,
  loginRider,
  registerRider,
  updaterider,
} from "../Controllers/rider.js";
import riderAuth from "../Middlewares/riderMiddleware.js";

const router = express.Router();
router.post("/api/register_rider", registerRider);
router.post("/api/loginredier", loginRider);
router.get("/api/riders", riderAuth, getRiders);
router.get("/api/rider/:riderId", riderAuth, getRider);
router.put("/api/rider/:riderId", riderAuth, updaterider);
router.delete("/api/rider/:riderId", riderAuth, deleterider);

export default router;
