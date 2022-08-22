import { Router } from "express";
import products from "./products.js";
import productsTest from "./productsTest.js";
import cart from "./cart.js";
import messages from "./messages.js";
import authController from "../controllers/authController.js";
import passport from "passport";

const router = Router();

//Register
router.post("/register", passport.authenticate('register', {failureRedirect: '/failRegister'}) ,authController.registerController);
router.post("/failRegister", authController.failRegisterController);

//Login
router.post("/login", passport.authenticate('login', {failureRedirect: '/failLogin'}) ,authController.loginController)
router.post("/failLogin", authController.failLoginController);

//Middleware authenticated
router.use(async function middlewareSession(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(401).json({ message: "Please login" })
});

router.post("/logout", authController.logoutController);

router.use("/api/products", products);
router.use("/api/products-test", productsTest);

router.use("/api/cart", cart);

router.use("/api/messages", messages);

export default router;
