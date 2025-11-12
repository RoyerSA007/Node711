const Brand = require('../models/Brands');
const Product = require('../models/Products');

class BrandsService {
  // GET: todos
  async getAll() {
    const brands = await Brand.find();
    if (!brands.length) throw new Error('No hay marcas creadas');
    return brands;
  }

  // GET: por id
  async getById(id) {
    const brand = await Brand.findById(id);
    if (!brand) throw new Error('Marca no encontrada');
    return brand;
  }

  // POST: crear nueva marca
  async create(data) {
    if (!data.name || !data.description || data.active == null)
      throw new Error('Faltan campos');

    const newBrand = new Brand(data);
    await newBrand.save();
    return newBrand;
  }

  // PATCH: actualizar marca
  async update(id, data) {
    if (data.active != null && typeof data.active !== 'boolean')
      throw new Error('El campo "active" debe ser booleano');

    const brand = await Brand.findByIdAndUpdate(id, data, { new: true });
    if (!brand) throw new Error('Marca no encontrada');
    return brand;
  }

  // DELETE: eliminar marca
  async delete(id) {
    const brand = await Brand.findById(id);
    if (!brand) throw new Error('Marca no encontrada');

    // Verificar si hay productos que usen esta marca
    const productInBrand = await Product.findOne({ brandId: id });
    if (productInBrand) throw new Error('La marca está en uso');

    await Brand.findByIdAndDelete(id);
    return brand;
  }
}

module.exports = new BrandsService();
