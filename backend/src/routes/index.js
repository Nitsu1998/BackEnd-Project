import { Router } from "express";
import products from "./products.js";
import productsTest from "./productsTest.js";
import cart from "./cart.js";
import messages from "./messages.js";
import authController from "../controllers/authController.js";
import { SessionDao } from "../models/index.js";

const router = Router();

router.post("/login", authController.registerController);

router.use(async function middlewareSession(req, res, next) {
    const sessionID = req.sessionID
    const response = await SessionDao.collection.findOne({sessionID})
    if (response) {
        return next()
    } 
    return res.status(401).json({ message: "Please login" }); 
});

router.post("/logout", authController.logoutController);

router.use("/api/products", products);
router.use("/api/products-test", productsTest);

router.use("/api/cart", cart);

router.use("/api/messages", messages);

export default router;
