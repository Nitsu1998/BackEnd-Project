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
      return (`Added Product N°: ${id}`);
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
        return null;
      } else {
        return (product);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(`./${this.fileName}`, "utf-8");
      return (JSON.parse(data));
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

const express = require("express")
const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.send('Home')
})

app.get('/products', (req, res) => {
  (async () => {
    res.json(await container1.getAll());
})()
})

app.get('/productRandom', (req, res) => {
  const randomId = Math.floor(Math.random() * (3) + 1);
  (async () => {
    res.json(await container1.getById(randomId))
  })()
})

app.listen(port, (error) => {
    if(!error) {
        console.log(`Server started on port ${port}`)
    } else {
        console.log(`Error: ${error}`)
    }
})




