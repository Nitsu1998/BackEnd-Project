import { Router } from "express";
import productController from "../controllers/productsController.js";
const router = Router()

router.get('/', productController.getRandomProductsController)

export default router