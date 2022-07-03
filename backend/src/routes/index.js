import { Router } from "express";
import products from './products.js';
import cart from './cart.js';
const router = Router();

router.use('/products', products);
router.use('/cart', cart)

export default router;
