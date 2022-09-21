const express = require('express')
const { Router } = express;
const fs = require('fs');
const Contenedor = require("./container");
const constructor = new Contenedor("./productos.txt")

const router = Router();

const Products = [];

const dataArray = [
  {
    name: "Teclado Midi - Arturia Micro Freak",
    price: 250,
    id: 1,
  },
  {
    name: "Auriculares AKG240",
    price: 210,
    id: 2,
  },
  {
    name: "Monitores KRK",
    price: 457,
    id: 3,
  },
];

//  devuelve todos los productos.
router.get('/productos', async (req, res) => {
  try {
    let data = await constructor.getAll();
    console.log(data);
    res.send(data);

  } catch (err) {
    res.status(404).send(err);
  }
});

// endpoint de prueba
router.get("/hbs", async (req, res) => {
  try {
    const data = await constructor.getAll();
    console.log(data);
    // se hace un render a productos.hbs
    res.render("productos", { dataArray: data });
  } catch (err) {
    res.status(404).send(err);
  }

});



//  -> devuelve un producto según su id. 
router.get('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.send(await constructor.getById(parseInt(id)));
  } catch (err) {
    res.status(404).send(err);
  }
});

// agrega productos 
router.post('/productos/hbs', async (req, res) => {
  try {
    const { title, price, tumbnail } = req.body;
    const id = Products.length + 1
    const itemToSave = {
      id,
      title,
      price,    
    }
    res.send(await constructor.save(itemToSave));
  } catch (err) {
    res.status(404).send(err);
  }
})


// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id. 
router.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, tumbnail } = req.body;
    const idInt = parseInt(id);
    const itemToUpdate = {
      id: idInt,
      title,
      price,
      tumbnail
    }
    res.send(await constructor.updateById(idInt, itemToUpdate));
  } catch (err) {
    res.status(404).send(err.msg);
  }
});


// DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    res.send(await constructor.deleteById(parseInt(id)));
  } catch (err) {
    res.status(404).send(err.msg);
  }
});

module.exports = router;

