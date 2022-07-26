import { CartDao, ProductDao } from "../daos/index.js";

class CartController {

  async createCartController(req, res) {
    try {
      await CartDao.save()
      return res.sendStatus(201);
    } catch {
      res.sendStatus(500);
    }
  }

  async deleteCartController(req, res) {
    try {
      const response = await CartDao.deleteById(req.params.id)
      if(response?.message) {
        return res.status(200).json(response)
      }
      return res.status(404).json(response)
    } catch {
      res.sendStatus(500);
    }
  }

  async getProductsInCartByIdController(req, res) {
    try {
      const response = await CartDao.getProductsInCartById(req.params.id);
      return res.status(200).json(response);
    } catch {
      res.sendStatus(500);
    }
  }

  async postProductInCartByIdController(req, res) {
    try {
      const productToAdd = await ProductDao.getById(req.body.id);
      if (productToAdd) {
        const response = await CartDao.addProductToCart(req.params.id, productToAdd);
        return res.status(200).json(response);
      }
      if (!product) {
        return res.status(404).json({ error: "Product not exist" });
      }
    } catch {
      res.sendStatus(500);
    }
  }

  async deleteProductInCartByIdController(req, res) {
    try {
      const productToDelete = await ProductDao.getById(req.params.id_prod);
      const response = await CartDao.deleteProductFromCart(req.params.id, productToDelete);
      return res.status(200).json(response);
    } catch {
      res.sendStatus(500);
    }
  }
}

const cartController = new CartController();

export default cartController;
