const { Router } = require('express')
const { indexController } = require('../controllers/indexController')
const router = Router()
const products = require('./products')

router.get('/', indexController)

router.use('/products', products)

module.exports = router