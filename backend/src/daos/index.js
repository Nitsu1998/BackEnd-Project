import config from "../config/config.js";

let ProductDao
let CartDao;

switch (config.DB) {
  case "mongo":
    const { default: ProductMongo } = await import("./products/productsMongo.js");
    const { default: CartMongo } = await import("./cart/cartMongo.js");

    ProductDao = new ProductMongo();
    CartDao = new CartMongo();
    break;

  case "firebase":
    const { default: ProductFirebase } = await import("./products/productsFirebase.js");
    const { default: CartFirebase } = await import("./cart/cartFirebase.js");

    ProductDao = new ProductFirebase();
    CartDao = new CartFirebase();
    break;

  default:
    break;
}

export { ProductDao, CartDao };
