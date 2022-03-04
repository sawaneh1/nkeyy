import express from "express";
import {
  deleteBusiness,
  getBusiness,
  getBusinesses,
  loginBusiness,
  registerBusiness,
  updateBusiness,
} from "../Controllers/business.js";
import businessAuth from "../Middlewares/businessAuth.js";

const router = express.Router();
router.post("/api/registerbusiness", registerBusiness);

// router.get("/api/business", getBusiness);
router.post("/api/loginbusiness", loginBusiness);
router.get("/api/businesses", businessAuth, getBusinesses);
router.put("/api/business/:businessId", businessAuth, updateBusiness);
router.delete("/api/business/:businessId", businessAuth, deleteBusiness);

export default router;
