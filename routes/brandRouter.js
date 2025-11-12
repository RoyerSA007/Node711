const express = require('express');
const router = express.Router();

const service = require('../service/brandsService');

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Obtener una lista de marcas
 *     tags:
 *      - Brands
 *     responses:
 *       200:
 *         description: Lista de marcas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
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
 * /brands/{id}:
 *   get:
 *     summary: Obtiene una marca por ID
 *     tags:
 *      - Brands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la marca
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Marca encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 active:
 *                   type: boolean
 *       404:
 *         description: Marca no encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.getById(id, 10);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Crea una nueva marca
 *     tags:
 *      - Brands
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
 *         description: Marca creada correctamente
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
 * /brands/{id}:
 *   patch:
 *     summary: Actualiza una marca por ID
 *     tags:
 *      - Brands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la marca a actualizar
 *         schema:
 *           type: string
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
 *         description: Marca actualizada correctamente
 *       400:
 *         description: Error en los parámetros o campos no permitidos
 *       404:
 *         description: Marca no encontrada
 */
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const response = await service.update(id, data);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Elimina una marca por ID
 *     tags:
 *      - Brands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la marca a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Marca eliminada correctamente
 *       400:
 *         description: La marca está en uso
 *       404:
 *         description: Marca no encontrada
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id, 10);
    res.status(200).json(response);
  } catch (error) {
    const statusCode = error.message.includes('en uso') ? 400 : 404;
    res.status(statusCode).json({ error: error.message });
  }
});

module.exports = router;
