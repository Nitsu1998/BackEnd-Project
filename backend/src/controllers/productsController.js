const product1 = require("../classProducts");

const getProductsController = async (req, res) => {
  try {
    const products = await product1.getAll()
    res.json(products);
  } catch {
    res.sendStatus(500);
  }
};

const postProductController = async (req, res) => {
  try {
    const { title, description, code, price, img, stock } = req.body;
    const product = { timestamp: Date.now(), title, description, code, img, price, stock };
    await product1.save(product);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
};

const getByIdController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "The parameter is not a number" });
      return;
    }
    const product = await product1.getById(id);
    if (product) {
      res.status(200).json(product);
    } else if (!product) {
      res.status(404).json({ error: "Product not exist" });
    } else {
      res.status(204).json(product.message);
    }
  } catch {
    res.sendStatus(500);
  }
};

const updateByIdController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "The parameter is not a number" });
      return;
    }
    const response = await product1.updateById(id, req.body);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch {
    res.sendStatus(500);
  }
};

const deleteByIdController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "The parameter is not a number" });
      return;
    }
    res.status(200).json(await product1.deleteById(id));
  } catch {
    res.sendStatus(500);
  }
};

module.exports = {
    getProductsController,
    getByIdController,
    postProductController,
    updateByIdController,
    deleteByIdController
}