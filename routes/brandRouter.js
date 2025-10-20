const express = require('express');
const router = express.Router();

const service = require('../service/brandsService')

// GET -> Obtener todas las marcas
router.get('/', (req, res) => {
  try {
    const response = service.getAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
});

// GET -> Obtener marca por id
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const response = service.getById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
});

// POST -> Crear una nueva marca
router.post('/', (req, res) => {
  try {
    const data = req.body;
    const response = service.create(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

// PATCH -> Actualizar una marca
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

// DELETE -> Eliminar una marca
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
//   "name": "Apple",
//   "description": "Tecnología avanzada",
//   "active": true
// }
