import express from "express";
import { getCustomer, signup } from "../Controllers/Customer.js";

const router = express.Router();
router.post("/api/signup", signup);

router.get("/api/customers", getCustomer);

export default router;
