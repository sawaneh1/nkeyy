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
import customerAuth from "../Middlewares/customerAuth.js";

const router = express.Router();
router.post("/api/registercustomer", registerCustomer);
router.post("/api/logincustomer", loginCustomer);

router.get("/api/customers", customerAuth, getCustomers);
router.get("/api/customer/:customerId", customerAuth, getCustomer);
router.put("/api/customer/:customerId", customerAuth, updateCustomer);
router.delete("/api/customer/:customerId", customerAuth, deleteCustomer);

export default router;
