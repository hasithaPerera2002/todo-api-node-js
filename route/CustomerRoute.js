const express = require("express");
const CustomerController = require("../controller/CustomerController");
const verifyToken = require("../middleware/AuthMiddleWare");

const router = express.Router();

router.post("/saveCustomer", verifyToken, CustomerController.saveCustomer);
router.put("/updateCustomer", verifyToken, CustomerController.updateCustomer);
router.delete(
  "/deleteCustomer",
  verifyToken,
  CustomerController.deleteCustomer
);
router.get("/getCustomer", verifyToken, CustomerController.getCustomer);
router.get("/getAll", verifyToken, CustomerController.findAllCustomers);

module.exports = router;
