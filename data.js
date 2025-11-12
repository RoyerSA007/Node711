const mongoose = require('mongoose');
const { fakerDE: faker } = require('@faker-js/faker');

// Importar los modelos
const User = require('./models/Users');
const Category = require('./models/Categories');
const Brand = require('./models/Brands');
const Product = require('./models/Products');

// Conexión a MongoDB
mongoose.connect('mongodb+srv://admin123:admin123@node711.hkwwhrn.mongodb.net/?retryWrites=true&w=majority&appName=Node711')
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar:', err));

const seedDatabase = async () => {
  try {
    // Limpiar las colecciones
    await User.deleteMany({});
    await Category.deleteMany({});
    await Brand.deleteMany({});
    await Product.deleteMany({});

    console.log('Datos anteriores eliminados.');

    // Crear usuarios
    const users = [];
    for (let i = 0; i < 5; i++) {
      users.push({
        name: faker.person.firstName(),
        username: faker.internet.username(),
        password: faker.internet.password()
      });
    }
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} usuarios creados.`);

    // Crear categorías y marcas
    const categories = [];
    const brands = [];

    for (let i = 0; i < 5; i++) {
      categories.push({
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        active: faker.datatype.boolean()
      });

      brands.push({
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        active: faker.datatype.boolean()
      });
    }

    const createdCategories = await Category.insertMany(categories);
    const createdBrands = await Brand.insertMany(brands);

    console.log(`${createdCategories.length} categorías creadas.`);
    console.log(`${createdBrands.length} marcas creadas.`);

    // Crear productos con referencias reales
    const products = [];
    for (let i = 0; i < 10; i++) {
      const randomCategory = faker.helpers.arrayElement(createdCategories);
      const randomBrand = faker.helpers.arrayElement(createdBrands);

      products.push({
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: Math.floor(Math.random() * 101),
        categoryId: randomCategory._id,
        brandId: randomBrand._id
      });
    }

    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} productos creados.`);

    console.log('Datos insertados');
  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
