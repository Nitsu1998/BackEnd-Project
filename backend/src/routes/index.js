import { Router } from "express";
import products from './products.js';
import productsTest from './productsTest.js'
import cart from './cart.js';
import messages from './messages.js'
const router = Router();

router.use('/products', products);
router.use('/products-test', productsTest)
router.use('/cart', cart)
router.use('/messages', messages)

export default router;
