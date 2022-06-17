const { Router } = require("express");
const { getAllProductsController, postProductController, getByIdController, updateByIdController, deleteByIdController } = require("../controllers/productsController");

const router = Router();

router.get("/", getAllProductsController);

router.post("/", postProductController);

router.get("/:id", getByIdController);

router.put("/:id", updateByIdController);

router.delete("/:id", deleteByIdController);

module.exports = router;
