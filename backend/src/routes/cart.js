const { Router } = require("express");
const router = Router();
const {
  createCartController,
  deleteCartController,
  getProductsInCartByIdController,
  postProductInCartByIdController,
  deleteProductInCartByIdController,
} = require("../controllers/cartController");

router.post("/", createCartController);
router.delete("/:id", deleteCartController);
router.get("/:id/products", getProductsInCartByIdController);
router.post("/:id/products", postProductInCartByIdController);
router.delete("/:id/products/:id_prod", deleteProductInCartByIdController)

module.exports = router;
