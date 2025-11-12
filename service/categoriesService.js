const Category = require('../models/Categories');
const Product = require('../models/Products');

class CategoriesService {
  // GET: todas las categorías
  async getAll() {
    const categories = await Category.find();
    if (!categories.length) throw new Error('No hay categorías creadas');
    return categories;
  }

  // GET: por ID
  async getById(id) {
    const category = await Category.findById(id);
    if (!category) throw new Error('Categoría no encontrada');
    return category;
  }

  // POST: crear nueva categoría
  async create(data) {
    if (!data.name || !data.description || data.active == null)
      throw new Error('Faltan campos');

    const newCategory = new Category(data);
    await newCategory.save();
    return newCategory;
  }

  // PATCH: actualizar categoría
  async update(id, data) {
    if (data.active != null && typeof data.active !== 'boolean')
      throw new Error('El campo "active" debe ser booleano');

    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    if (!category) throw new Error('Categoría no encontrada');
    return category;
  }

  // DELETE: eliminar categoría
  async delete(id) {
    const category = await Category.findById(id);
    if (!category) throw new Error('Categoría no encontrada');

    // Verificar si hay productos usando esta categoría
    const productsInCategory = await Product.findOne({ categoryId: id });
    if (productsInCategory) throw new Error('La categoría está en uso');

    await Category.findByIdAndDelete(id);
    return category;
  }
}

module.exports = new CategoriesService();
