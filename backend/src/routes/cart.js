import { Router } from "express";
import cartController  from "../controllers/cartController.js";
const router = Router();

router.post("/", cartController.createCartController);
router.delete("/:id", cartController.deleteCartController);
router.get("/:id/products", cartController.getProductsInCartByIdController);
router.post("/:id/products", cartController.postProductInCartByIdController);
router.delete("/:id/products/:id_prod", cartController.deleteProductInCartByIdController)

export default router;
