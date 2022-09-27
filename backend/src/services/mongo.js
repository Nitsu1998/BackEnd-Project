import config from "../config/config.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URL);
  } catch (err) {
    console.log(err);
  }
};
connectDB();

class Mongo {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async save(object) {
    try {
      const response = await this.collection(object);
      await response.save();
      return response
    } catch (err) {
      console.log(err);
      return
    }
  }

  async getById(id) {
    try {
      const response = await this.collection.findById({ _id: id }, { __v: 0 });
      return response;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async getAll() {
    try {
      const response = await this.collection.find({}, { __v: 0 });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async updateById(id, object) {
    try {
      await this.collection.updateOne({ _id: id }, { $set: object });
      return { message: "Product updated" };
    } catch (err) {
      console.log(err);
      return { erorr: "Product not found" };
    }
  }

  async deleteById(id) {
    try {
      await this.collection.deleteOne({ _id: id });
      return { message: "Deleted" };
    } catch (err) {
      console.log(err);
      return { erorr: "Not found" };
    }
  }

  async getProductsInCartById(idCart) {
    try {
      const response = await this.collection.find({_id: idCart}, {products: 1, _id: 0})
      return response[0].products
    } catch (err) {
      console.log(err);
    }
  }

  async addProductToCart(idCart, product) {
    try {
      await this.collection.updateOne({_id: idCart}, {$push: {products: product}})
      return { message: "Product Added" }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProductFromCart(idCart, product) {
    try {
      await this.collection.updateOne({_id: idCart}, {$pull: {products: product[0]}})
      return { message: "Product deleted from cart" }
    } catch (err) {
      console.log(err);
    }
  }
}

export default Mongo;
