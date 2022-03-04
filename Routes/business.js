import express from "express";
import {
  deleteBusiness,
  getBusiness,
  getBusinesses,
  loginBusiness,
  registerBusiness,
  updateBusiness,
} from "../Controllers/business.js";

const router = express.Router();
router.post("/api/registerbusiness", registerBusiness);

// router.get("/api/business", getBusiness);
router.post("/api/loginbusiness", loginBusiness);
router.get("/api/businesses", getBusinesses);
router.put("/api/business/:businessId", updateBusiness);
router.delete("/api/business/:businessId", deleteBusiness);

export default router;
