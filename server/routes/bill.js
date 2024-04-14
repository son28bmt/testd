const express = require("express");
const router = express.Router();

const BillController = require("../controllers/BillController");

// Controller

router.put("/confirm/:billId", BillController.confirm);

router.delete("/:billId", BillController.delete);

router.get("/", BillController.findAll);
router.post("/", BillController.create);


module.exports = router;