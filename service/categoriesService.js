const { categories } = require('../mock/mockData');
const { products } = require('../mock/mockData');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  // GENERATE -> Generar categorias
  generate() {
    this.categories = categories;
  }

  // GET -> Obtener todas las categorias
  getAll() {
    if (this.categories.length < 1)
      throw new Error('No hay Categorías Creadas');
    return this.categories;
  }

  // GET -> Obtener categoria por id
  getById(id) {
    const category = this.categories.find((c) => c.id == id);
    if (!category) throw new Error('Categoria No Encontrada');
    return category;
  }

  // POST -> Crear una nueva categoria
  create(data) {
    if (!data.name || !data.description || data.active == null)
      throw new Error('Faltan Campos');

    const newCategory = {
      id: this.categories.at(-1).id + 1,
      ...data,
    };
    this.categories.push(newCategory);

    return newCategory;
  }

  // PATCH -> Actualizar una categoria
  update(id, data) {
    const index = this.categories.findIndex((i) => i.id == id);
    if (index === -1) throw new Error('Categoria No Encontrada');
    const category = this.categories[index];

    if (data.active != null && typeof data.active !== 'boolean')
      throw new Error('Active no es Booleano');

    const dataKeys = Object.keys(data);
    const notPermitedKeys = dataKeys.filter(
      (d) => d != 'name' && d != 'description' && d != 'active',
    );
    if (notPermitedKeys.length > 0) throw new Error('Parametros No Permitidos');

    this.categories[index] = {
      ...category,
      ...data,
    };

    return this.categories[index];
  }

  // DELETE -> Eliminar una categoria
  delete(id) {
    const category = this.categories.find((c) => c.id == id);
    if (!category) throw new Error('Categoria No Encontrada');

    const productsInCategory = products.find((p) => p.categoryId == id);
    if (productsInCategory) throw new Error('La Categoria está en uso');

    this.categories = this.categories.filter((c) => c.id != id);
    return category;
  }
}

module.exports = new CategoriesService();
