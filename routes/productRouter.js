const express = require('express');
const router = express.Router();

const service = require('../service/productService');

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener una lista de productos
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Lista de productos
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
 *                   price:
 *                     type: number
 *                   stock:
 *                     type: number
 *                   categoryId:
 *                     type: string
 *                   brandId:
 *                     type: string
 *       404:
 *         description: No hay Productos Creados
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
 * /products/category/{categoryId}:
 *   get:
 *     summary: Obtiene productos por ID de categoría
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos en la categoría
 *       404:
 *         description: Categoría No Encontrada o No Hay Productos en esta Categoría
 */
router.get('/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const response = await service.getByCategory(categoryId, 10);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto (UUID)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: Producto No Encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /products/brand/{brandId}:
 *   get:
 *     summary: Obtiene productos por ID de marca
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         description: ID de la marca
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos de la marca
 *       404:
 *         description: Marca No Encontrada o No Hay Productos en esta Marca
 */
router.get('/brand/:brandId', async (req, res) => {
  try {
    const { brandId } = req.params;
    const response = await service.getByBrand(brandId, 10);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - categoryId
 *               - brandId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               brandId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto Creado
 *       400:
 *         description: Faltan Campos o Campos Inválidos
 *       404:
 *         description: Categoría No Encontrada o Marca No Encontrada
 */
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const response = await service.create(data);
    res.status(201).json(response);
  } catch (error) {
    const statusCode = error.message.includes('No Encontrada') ? 404 : 400;
    res.status(statusCode).json({ error: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Actualiza campos parciales de un producto por ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto (UUID) a actualizar
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
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       404:
 *         description: Producto No Encontrado, Categoría No Encontrada o Marca No Encontrada
 */
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const response = await service.update(id, data);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto (UUID) a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto No Encontrado
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
