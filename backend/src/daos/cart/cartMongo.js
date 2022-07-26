import Mongo from "../../containers/mongo.js";

class CartMongo extends Mongo {
  constructor() {
    super("carts", {
      timestamp: { type: Number, default: new Date().getTime() },
      products : { type: Array, required: true }
    });
  }
}

export default CartMongo;