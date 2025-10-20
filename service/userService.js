const { fakerDE: faker } = require('@faker-js/faker');
const { users } = require('../mock/mockData');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }

  // GENERATE -> Generar usuarios
  generate() {
    this.users = users;
  }

  // GET -> Obtener todos los usuarios
  getAll() {
    if (this.users.length < 1) throw new Error('Usuarios No Encontrados');
    return this.users;
  }

  // GET -> Obtener usuario por id
  getById(id) {
    const user = this.users.find((u) => u.id == id);
    if (!user) throw new Error('Usuario No Encontrado');
    return user;
  }

  // POST -> Crear un nuevo usuario
  create(data) {
    if (!data.name || !data.username || !data.password)
      throw new Error('Faltan Campos');

    const newUser = {
      id: this.users.at(-1).id + 1,
      ...data,
    };
    this.users.push(newUser);

    return newUser;
  }

  // PATCH -> Actualizar un usuario
  update(id, data) {
    const index = this.users.findIndex((i) => i.id == id);
    if (index === -1) throw new Error('Usuario No Encontrado');
    const user = this.users[index];

    this.users[index] = {
      ...user,
      ...data,
    };

    return this.users[index];
  }

  // DELETE -> Eliminar un usuario
  delete(id) {
    const user = this.users.find((u) => u.id == id);
    if (!user) throw new Error('Usuario No Encontrado');

    this.users = this.users.filter((c) => c.id != id);
    return user;
  }
}

module.exports = new UserService();
