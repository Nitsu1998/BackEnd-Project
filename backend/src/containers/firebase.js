import config from "../config/config.js";
import admin from "firebase-admin"

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
})
const db = admin.firestore()

const generateRandom = () => {
  return "#" + (Math.random() + 1).toString(36).substring(4);
};

class Firebase {
  constructor(collection) {
    this.collection = db.collection(collection);
  }

  async save(object) {
    try {
      const add = this.collection.doc()
      if (object !== undefined) {
        await add.create({...object, code: generateRandom(), timestamp: new Date().getTime()})
      } else {
        await add.create({timestamp: new Date().getTime(), products: []})
      }
      return 
    } catch (err) {
      console.log(err);
    }
  }
  
  async getById(id) {
    try {
      let snapshot = this.collection.doc(id)
      snapshot = await snapshot.get()
      return snapshot.data()
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      let snapshot = await this.collection.get()
      snapshot = snapshot.docs
      const response = snapshot.map((element) => ({
        id: element.id,
        ...element.data()
      }))
      return response

    } catch (err) {
      console.log(err);
    }
  }

  async updateById(id, object) {
    try {
      const snapshot = this.collection.doc(id)
      await snapshot.update(object)
      return { message: "Updated" };
    } catch (err) {
      console.log(err);
      return { erorr: "Product not found" };
    }
  }

  async deleteById(id) {
    try {
      const snapshot = this.collection.doc(id)
      await snapshot.delete()
      return { message: "Deleted" };
    } catch (err) {
      console.log(err);
    }
  }

  async getProductsInCartById(idCart) {
    try {
      let snapshot = this.collection.doc(idCart)
      snapshot = await snapshot.get("products")
      return(snapshot.data().products)
    } catch (err) {
      console.log(err);
    }
  }

  async addProductToCart(idCart, product) {
    try {
      let snapshot = this.collection.doc(idCart)
      snapshot = await snapshot.update({products: admin.firestore.FieldValue.arrayUnion(product)})
      return { message: "Product Added" }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProductFromCart(idCart, product) {
    try {
      let snapshot = this.collection.doc(idCart)
      snapshot = await snapshot.update({products: admin.firestore.FieldValue.arrayRemove(product)})
      return { message: "Product removed from cart" }
    } catch (err) {
      console.log(err);
    }
  }
}

export default Firebase;
