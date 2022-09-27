import config from "../config/config.js";
import newMail from "../helpers/nodemailer.js";
import newWhatsappMessage from "../helpers/twilio.js";
import { CartDao, ProductDao, UserDao } from "../models/index.js";

class CartController {
  async createCartController(req, res) {
    try {
      const response = await CartDao.save();
      return res.status(201).json({ cartId: response._id });
    } catch {
      res.sendStatus(500);
    }
  }

  async deleteCartController(req, res) {
    try {
      const response = await CartDao.deleteById(req.params.id);
      if (response?.message) {
        return res.status(200).json(response);
      }
      return res.status(404).json(response);
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
        const response = await CartDao.addProductToCart(
          req.params.id,
          productToAdd
        );
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
      const response = await CartDao.deleteProductFromCart(
        req.params.id,
        productToDelete
      );
      return res.status(200).json(response);
    } catch {
      res.sendStatus(500);
    }
  }

  async endPurchase(req, res) {
    try {
      const response = await CartDao.getProductsInCartById(req.params.id);
      const user = await UserDao.getById(req.session.passport.user);
      const subjectForAdmin = `New purchase from ${user.username} - ${user.email}`;
      const adminPhone = `whatsapp:${config.TWILIO_ADMIN_PHONE}`;
      const subjectForClient =
        "Your purchase was registered and is being processed";
      const clientPhone = `whatsapp:+${user.phone}`;
      newMail(subjectForAdmin, response);
      newWhatsappMessage(subjectForAdmin, adminPhone);
      newWhatsappMessage(subjectForClient, clientPhone);
      return res.sendStatus(200);
    } catch {
      res.sendStatus(500);
    }
  }
}

const cartController = new CartController();

export default cartController;
