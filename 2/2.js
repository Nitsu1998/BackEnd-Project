const fs = require("fs");

class Container {
  constructor(fileName) {
    this.fileName = fileName;
  }
  async save(newProduct) {
    try {
      let data = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, "utf-8"));
      const id = data.length + 1;
      data.push({ id: id, ...newProduct });
      await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data));
      console.log(`Added Product N°: ${id}`);
    } catch (err) {
      console.log(err);
    }
  }
  async getById(id) {
    try {
      let data = JSON.parse(
        await fs.promises.readFile(`./${this.fileName}`, "utf-8")
      );
      const product = data.find((product) => product.id === id);
      if (product?.deleted || !product) {
        console.log(null);
      } else {
        console.log(product);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(`./${this.fileName}`, "utf-8");
      console.log(JSON.parse(data));
    } catch (err) {
      console.log(err);
    }
  }
  async deleteById(id) {
    try {
      let productUpdate = [];
      let data = JSON.parse(
        await fs.promises.readFile(`./${this.fileName}`, "utf-8")
      );
      data.forEach((element) => {
        if (element.id !== id) {
          productUpdate.push(element);
        } else {
          productUpdate.push({id: id, deleted: true})
        }
      });
      await fs.promises.writeFile(
        `./${this.fileName}`,
        JSON.stringify(productUpdate)
      );
    } catch (err) {
      console.log(err);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify([]));
    } catch (err) {
      console.log(err);
    }
  }
}

const container1 = new Container("products.txt");
(async () => {
    await container1.getAll();
    await container1.save({title: "God of War: Ragnarök", price: 15, img: "https://static.wikia.nocookie.net/godofwar/images/c/ca/Portada_God_of_War_Ragnarok.png/revision/latest?cb=20211008000423&path-prefix=es",});
    await container1.getById(4);
    await container1.deleteById(4);
    await container1.deleteAll();
})()
