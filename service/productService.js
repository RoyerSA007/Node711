const Product = require('../models/Products');
const Category = require('../models/Categories');
const Brand = require('../models/Brands');

class ProductsService {
  // Obtener todos los productos
  async getAll() {
    const products = await Product.find().populate('categoryId').populate('brandId');
    if (!products.length) throw new Error('No hay productos creados');
    return products;
  }

  // Obtener producto por ID
  async getById(id) {
    const product = await Product.findById(id).populate('categoryId').populate('brandId');
    if (!product) throw new Error('Producto no encontrado');
    return product;
  }

  async getByCategory(categoryId) {
    const category = await Category.findById(categoryId);
    if (!category) throw new Error('Categoría no encontrada');

    const productsInCategory = await Product.find({ categoryId }).populate('brandId');
    if (!productsInCategory.length) throw new Error('No hay productos en esta categoría');

    return productsInCategory;
  }

  async getByBrand(brandId) {
    const brand = await Brand.findById(brandId);
    if (!brand) throw new Error('Marca no encontrada');

    const productsInBrand = await Product.find({ brandId }).populate('categoryId');
    if (!productsInBrand.length) throw new Error('No hay productos en esta marca');

    return productsInBrand;
  }

  async create(data) {
    const { name, description, price, stock, categoryId, brandId } = data;

    // Validaciones
    if (!name || !description || price == null || stock == null || !categoryId || !brandId)
      throw new Error('Faltan campos');

    if (isNaN(price) || isNaN(stock))
      throw new Error('El precio y el stock deben ser numéricos');

    // Verificar existencia de categoría y marca
    const category = await Category.findById(categoryId);
    const brand = await Brand.findById(brandId);
    if (!category) throw new Error('Categoría no encontrada');
    if (!brand) throw new Error('Marca no encontrada');

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      categoryId,
      brandId
    });

    await newProduct.save();
    return newProduct;
  }

  async update(id, data) {
    const product = await Product.findById(id);
    if (!product) throw new Error('Producto no encontrado');

    // Validar categoría o marca si se envían
    if (data.categoryId) {
      const category = await Category.findById(data.categoryId);
      if (!category) throw new Error('Categoría no encontrada');
    }

    if (data.brandId) {
      const brand = await Brand.findById(data.brandId);
      if (!brand) throw new Error('Marca no encontrada');
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
    return updatedProduct;
  }

  //Eliminar producto
  async delete(id) {
    const product = await Product.findById(id);
    if (!product) throw new Error('Producto no encontrado');

    await Product.findByIdAndDelete(id);
    return product;
  }
}

module.exports = new ProductsService();
