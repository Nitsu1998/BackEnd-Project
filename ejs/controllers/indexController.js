const path = require('path')

const indexController = (req, res) => {
  res.render('addProduct.ejs');
};

module.exports = { indexController };
