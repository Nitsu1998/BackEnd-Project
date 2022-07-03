const { Router } = require("express");
const router = Router();
const products = require('./products')
const cart = require('./cart')


router.use('/products', products);
router.use('/cart', cart)

module.exports = router;
