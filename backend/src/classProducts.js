import { promises } from "fs";

class Products {
  async save(newProduct) {
    try {
      let data = JSON.parse(await promises.readFile("./products.txt", "utf-8"));
      const id = data.length + 1;
      data.push({ id: id, ...newProduct });
      await promises.writeFile("./products.txt", JSON.stringify(data));
      return { message: `Product added with id: ${id}` };
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id) {
    try {
      let data = JSON.parse(await promises.readFile("./products.txt", "utf-8"));
      const product = data.find((product) => product.id === id);

      if (product?.deleted) {
        return { message: "This product has the information deleted" };
      }
      if (!product) {
        return null;
      }
      return product;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      const data = await promises.readFile("./products.txt", "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
  }

  async updateById(id, infoToUpdate) {
    try {
      let data = JSON.parse(await promises.readFile("./products.txt", "utf-8"));
      const product = data.find((product) => product.id === id);

      if (!product) {
        return null;
      }

      let productsUpdate = [];
      const { title, description, code, price, img, stock } = infoToUpdate;
      data.forEach((element) => {
        if (element.id === id) {
          const timestamp = element.timestamp
          productsUpdate.push({ id, timestamp, title, description, code, price, img, stock });
        } else {
          productsUpdate.push(element);
        }
      });
      await promises.writeFile(
        "./products.txt",
        JSON.stringify(productsUpdate)
      );
      return { message: `Product updated id: ${id}` };
      
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      let productUpdate = [];
      let data = JSON.parse(await promises.readFile("./products.txt", "utf-8"));
      data.forEach((element) => {
        if (element.id !== id) {
          productUpdate.push(element);
        } else {
          productUpdate.push({ id: id, deleted: true });
        }
      });
      await promises.writeFile("./products.txt", JSON.stringify(productUpdate));
    } catch (err) {
      console.log(err);
    }
  }
  async deleteAll() {
    try {
      await promises.writeFile("./products.txt", JSON.stringify([]));
    } catch (err) {
      console.log(err);
    }
  }
}

const product1 = new Products();

export default product1;
