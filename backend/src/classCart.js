import { promises } from "fs";

class Cart {
  async save(newCart) {
    try {
      let data = JSON.parse(await promises.readFile("./carts.txt", "utf-8"));
      const id = data.length + 1;
      data.push({ id: id, ...newCart });
      await promises.writeFile("./carts.txt", JSON.stringify(data));
      return { message: `Cart created with id: ${id}` };
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      let cartsUpdate = [];
      let data = JSON.parse(await promises.readFile("./carts.txt", "utf-8"));
      data.forEach((element) => {
        if (element.id !== id) {
          cartsUpdate.push(element);
        } else {
          cartsUpdate.push({ id: id, deleted: true });
        }
      });
      await promises.writeFile("./carts.txt", JSON.stringify(cartsUpdate));
    } catch (err) {
      console.log(err);
    }
  }

  async getProductsInCartById(idCart) {
    let data = JSON.parse(await promises.readFile("./carts.txt", "utf-8"));
    const cart = data.find((cart) => cart.id === idCart);
    if (cart?.deleted) {
      return { message: "This cart has the information deleted" };
    } else if (!cart) {
      return { message: "Cart not exist" };
    } else {
      return cart.products;
    }
  }

  async addProduct(idCart, product) {
    let cartsUpdate = [];
    let data = JSON.parse(await promises.readFile("./carts.txt", "utf-8"));
    const cart = data.find((cart) => cart.id === idCart);
    if (cart?.deleted) {
      return { message: "This cart has the information deleted" };
    } else if (!cart) {
      return { message: "Cart not exist" };
    } else {
      data.forEach((element) => {
        if (element.id !== idCart) {
          cartsUpdate.push(element);
        } else {
          cart.products.push(product);
          cartsUpdate.push(cart);
        }
      });
      promises.writeFile("./carts.txt", JSON.stringify(cartsUpdate));
      return { message: `Added product to cart` };
    }
  }

  async deleteProductFromCart(idCart, idProduct) {

    const productsUpdate = []
    let data = JSON.parse(await promises.readFile("./carts.txt", "utf-8"));
    const cart = data.find((cart) => cart.id === idCart);
    const productsInCart = cart.products

    if (cart?.deleted) {
      return { message: "This cart has the information deleted" };
    }
    if (!cart) {
      return { message: "Cart not exist" };
    }

    productsInCart.forEach((product) => {
      if(product.id !== idProduct) {
        productsUpdate.push(product)
      }
    })
    data[idCart-1].products = productsUpdate
    promises.writeFile("./carts.txt", JSON.stringify(data));
    return ({message: `Deleted product with id: ${idProduct} in cart with id: ${idCart}`});
  }
}

const cart1 = new Cart();

export default cart1;
