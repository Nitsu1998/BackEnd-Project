const path = require('path')

const indexController = (req, res) => {
  res.render('addProduct.pug');
};

module.exports = { indexController };
