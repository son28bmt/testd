const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const verifyToken = require("../middleware/verifyToken");
const multer = require("../middleware/multer");


// Controller

router.get("/infoManager", ProductController.infoManager);

router.post("/images", verifyToken, multer.array("files", 10), ProductController.uploadImages);
router.post("/image", verifyToken, multer.single("file"), ProductController.uploadImage);

router.put("/:productId", ProductController.update);
router.delete("/:productId", ProductController.delete);
router.get("/:productId", ProductController.findOne);

router.post("/", verifyToken, ProductController.create);
router.get("/", ProductController.findAll);


module.exports = router;