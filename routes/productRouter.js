const express = require('express');
const router = express.Router();

const service = require('../service/productService')

// GET -> Obtener todos los productos
router.get('/', (req, res) => {
  try {
    const response = service.getAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
});

// GET -> Obtener producto por id
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const response = service.getById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
});

// GET -> Obtener productos por categoria
router.get('/category/:categoryId', (req, res) => {
  try {
    const { categoryId } = req.params;
    const response = service.getByCategory(categoryId);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

// GET -> Obtener productos por marca
router.get('/brand/:brandId', (req, res) => {
  try {
    const { brandId } = req.params;
    const response = service.getByBrand(brandId);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

// POST -> Crear un nuevo producto
router.post('/', (req, res) => {
  try {
    const data = req.body;
    const response = service.create(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
});

// PUT -> Actualizar un producto
router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const response = service.update(id, data)
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});

// DELETE -> Eliminar un producto
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const response = service.delete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

module.exports = router;


// {
//   "name": "Laptop Gamer",
//   "description": "Alta potencia y rendimiento",
//   "price": 25000,
//   "stock": 15,
//   "categoryId": 1,
//   "brandId": 2
// }

