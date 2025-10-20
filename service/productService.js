const { fakerDE: faker } = require('@faker-js/faker');
const categoriesService = require('./categoriesService');
const brandsService = require('./brandsService');
const { products } = require('../mock/mockData');

// PRODUCTS SERVICE
class ProductsService {
  constructor() {
      this.products = [];
      this.generate();
  }

  // GENERATE -> Generar productos
  generate() {
    this.products = products;
  }

  // GET -> Obtener todos los productos
  getAll() {
    if (this.products.length < 1) throw new Error('No hay Productos Creados');
    return this.products;
  }

  // GET -> Obtener producto por id
  getById(id) {
    const product = this.products.find(p => p.id == id);
    if (!product) throw new Error('Producto No Encontrado');
    return product;
  }

   // GET -> Obtener productos por id de categoría
  getByCategory(categoryId) {
    console.log("CategoriesService:", categoriesService);

    const category = categoriesService.getAll().find(c => c.id == categoryId);
    if (!category) throw new Error('Categoría No Encontrada');

    const productsInCategory = this.products.filter(p => p.categoryId == category.id);
    if (productsInCategory.length < 1) throw new Error('No Hay Productos en esta Categoría');

    return productsInCategory;
  }

  // GET -> Obtener productos por id de marca
  getByBrand(brandId) {
    const brand = brandsService.getAll().find(b => b.id == brandId);
    if (!brand) throw new Error('Marca No Encontrada');

    const productsInBrand = this.products.filter(p => p.brandId == brand.id);
    if (productsInBrand.length < 1) throw new Error('No Hay Productos en esta Marca');

    return productsInBrand;
  }

  // POST -> Crear un nuevo producto
  create(data) {
    if (!data.name || !data.description || !data.price || !data.stock || !data.categoryId || !data.brandId)
      throw new Error('Faltan Campos');

    const category = categoriesService.getAll().find(c => c.id == data.categoryId);
    const brand = brandsService.getAll().find(b => b.id == data.brandId);

    if (!category) throw new Error('Categoría No Encontrada');
    if (!brand) throw new Error('Marca No Encontrada');

    const newProduct = { id: faker.string.uuid(), ...data }
    this.products.push(newProduct);

    return newProduct;
  }

  // PATCH -> Actualizar un producto
  update(id, data) {
    const index = this.products.findIndex(i => i.id == id);
    if (index === -1) throw new Error('Producto No Encontrado');
    const product = this.products[index];

    if (data.categoryId) {
      const category = categoriesService.getAll().find(c => c.id == data.categoryId);
      if (!category) throw new Error('Categoría No Encontrada');
    }
    if (data.brandId) {
      const brand = brandsService.getAll().find(c => c.id == data.brandId);
      if (!brand) throw new Error('Marca No Encontrada');
    }

    this.products[index] = {
      ...product,
      ...data
    }

    return this.products[index];
  }

  // DELETE -> Eliminar un producto
  delete(id) {
    const product = this.products.find(p => p.id == id);
    if (!product) throw new Error('Producto No Encontrado');

    this.products = this.products.filter(p => p.id != id);
    return product;
  }
}

module.exports = new ProductsService();
