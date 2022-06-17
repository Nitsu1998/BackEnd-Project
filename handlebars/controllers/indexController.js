const path = require('path')

const indexController = (req, res) => {
  res.render('addProduct');
};

module.exports = { indexController };
