import Firebase from "../../containers/firebase.js";

class CartFirebase extends Firebase {
    constructor() {
        super("carts")
    }
}

export default CartFirebase