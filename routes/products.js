const { Router } = require("express");
const router = Router();
const Products = require("../class.js");

const products1 = new Products("products.txt");

router.get('/', (req, res) => {
  (async () => {
    res.json(await products1.getAll());
  })();
});

router.post('/', (req, res) => {
  const { title, price, img } = req.body
  const product = { title, price, img };
    (async () => {
        res.status(201).json(await products1.save(product));
      })();
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    if(isNaN(id)) {
      res.status(400).json({error: 'The parameter is not a number'})
      return
    };
    (async () => {
      const product = await products1.getById(id);
      if(product) {
        res.status(200).json(product)
      } else if(!product){
        res.status(404).json({error: 'Product not found'})
      } else {
        res.status(204).json(product.message)
      }
    })();
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  if(isNaN(id)) {
    res.status(400).json({error: 'The parameter is not a number'})
    return
  };
  (async () => {
    const response = await products1.updateById(id, req.body);
    if (response) {
      res.status(200).json(response)
    } else {
      res.status(404).json({error: 'Product not found'})
    }
  })();
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if(isNaN(id)) {
    res.status(400).json({error: 'The parameter is not a number'})
    return
  };
  (async () => {
    res.status(200).json(await products1.deleteById(id));
  })();
})


module.exports = router;
