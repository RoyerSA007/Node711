const { brands } = require('../mock/mockData');
const { products } = require('../mock/mockData');


class BrandsService {
  constructor() {
    this.brands = [];
    this.generate();
  }

  generate() {
    this.brands = brands;
  }

  // GET -> Obtener todas las marcas
  getAll() {
    if (this.brands.length < 1) throw new Error('No hay Marcas Creadas');
    return this.brands;
  }

  // GET -> Obtener marca por id
  getById(id) {
    const brand = this.brands.find((b) => b.id == id);
    if (!brand) throw new Error('Marca No Encontrada');
    return brand;
  }

  // POST -> Crear una nueva marca
  create(data) {
    if (!data.name || !data.description || data.active == null)
      throw new Error('Faltan Campos');

    const newBrand = {
      id: this.brands.at(-1).id + 1,
      ...data,
    };
    this.brands.push(newBrand);

    return newBrand;
  }

  // PATCH -> Actualizar una marca
  update(id, data) {
    const index = this.brands.findIndex((i) => i.id == id);
    if (index === -1) throw new Error('Marca No Encontrada');
    const brand = this.brands[index];

    if (data.active != null && typeof data.active !== 'boolean')
      throw new Error('Active no es Booleano');

    const dataKeys = Object.keys(data);
    const notPermitedKeys = dataKeys.filter(
      (d) => d != 'name' && d != 'description' && d != 'active',
    );
    if (notPermitedKeys.length > 0) throw new Error('No hay Parametros Permitidos');

    this.brands[index] = {
      ...brand,
      ...data,
    };

    return this.brands[index];
  }

  // DELETE -> Eliminar una marca
  delete(id) {
    const brand = this.brands.find((c) => c.id == id);
    if (!brand) throw new Error('Marca No Encontrada');

    const productsInBrand = products.find(p => p.brandId == id);

    if (productsInBrand) throw new Error('La Marca está en uso');

    this.brands = this.brands.filter((c) => c.id != id);
    return brand;
  }
}

module.exports = new BrandsService();
