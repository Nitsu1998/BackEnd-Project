import Firebase from "../../containers/firebase.js";

class ProductFirebase extends Firebase {
    constructor() {
        super("products")
    }
}

export default ProductFirebase