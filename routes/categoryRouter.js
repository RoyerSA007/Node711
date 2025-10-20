const express = require('express');
const router = express.Router();

const service = require('../service/categoriesService')

// GET -> Obtener todas las categorias
router.get('/', (req, res) => {
  try {
    const response = service.getAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
});

// GET -> Obtener categoria por id
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const response = service.getById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
});

// POST -> Crear una nueva categoria
router.post('/', (req, res) => {
  try {
    const data = req.body;
    const response = service.create(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

// PATCH -> Actualizar una categoria
router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const response = service.update(id, data);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
});

// DELETE -> Eliminar una categoria
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
//   "name": "Tecnología",
//   "description": "Productos electrónicos",
//   "active": true
// }
