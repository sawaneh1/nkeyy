import express from "express";
import {
  deleteCustomer,
  getCustomer,
  //   getCustomer,
  getCustomers,
  loginCustomer,
  registerCustomer,
  updateCustomer,
} from "../Controllers/Customer.js";

const router = express.Router();
router.post("/api/registercustomer", registerCustomer);
router.post("/api/logincustomer", loginCustomer);

router.get("/api/customers", getCustomers);
router.get("/api/customer/:customerId", getCustomer);
router.put("/api/customer/:customerId", updateCustomer);
router.delete("/api/customer/:customerId", deleteCustomer);

export default router;
