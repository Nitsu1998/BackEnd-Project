const { Router } = require("express");
const router = Router();
const {
  getProductsController,
  getByIdController,
  postProductController,
  updateByIdController,
  deleteByIdController,
} = require("../controllers/productsController");
const isAdmin = true;

router.get("/", getProductsController);
router.get("/:id", getByIdController);

router.use(function middlewareIsAdmin(req, res, next) {
  if (!isAdmin) {
    return res.status(401).json({ message: "No authorization" });
  }
  next();
});

router.post("/", postProductController);
router.put("/:id", updateByIdController);
router.delete("/:id", deleteByIdController);

module.exports = router;
