const express = require('express');
const router = express.Router();

const Zservice = require('../service/categoriesService');

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtener una lista de categorías
 *     tags:
 *      - Categories
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   active:
 *                     type: boolean
 */
router.get('/', async (req, res) => {
  try {
    const response = await service.getAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtiene una categoría por ID
 *     tags:
 *      - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 active:
 *                   type: boolean
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.getById(parseInt(id, 10));
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags:
 *      - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - active
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Categoría creada correctamente
 *       400:
 *         description: Faltan campos o datos inválidos
 */
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const response = await service.create(data);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Actualiza una categoría por ID
 *     tags:
 *      - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a actualizar
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       400:
 *         description: Error en los parámetros o campos no permitidos
 *       404:
 *         description: Categoría no encontrada
 */
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const response = await service.update(parseInt(id, 10), data);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Elimina una categoría por ID
 *     tags:
 *      - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a eliminar
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente
 *       400:
 *         description: La categoría está en uso
 *       404:
 *         description: Categoría no encontrada
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.delete(parseInt(id, 10));
    res.status(200).json(response);
  } catch (error) {
    const statusCode = error.message.includes('en uso') ? 400 : 404;
    res.status(statusCode).json({ error: error.message });
  }
});

module.exports = router;
