const User = require('../models/Users');

class UsersService {
  //Obtener todos
  async getAll() {
    const users = await User.find();
    if (!users.length) throw new Error('No hay usuarios registrados');
    return users;
  }

  //Obtener por ID
  async getById(id) {
    const user = await User.findById(id);
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  }

  //Crear
  async create(data) {
    const { name, username, password } = data;
    if (!name || !username || !password)
      throw new Error('Faltan campos requeridos');

    // Validar que el username no esté repetido
    const existingUser = await User.findOne({ username });
    if (existingUser) throw new Error('El nombre de usuario ya existe');

    const newUser = new User({ name, username, password });
    await newUser.save();
    return newUser;
  }

  //Actualizar
  async update(id, data) {
    const user = await User.findById(id);
    if (!user) throw new Error('Usuario no encontrado');

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    return updatedUser;
  }

  //Eliminar
  async delete(id) {
    const user = await User.findById(id);
    if (!user) throw new Error('Usuario no encontrado');

    await User.findByIdAndDelete(id);
    return user;
  }
}

module.exports = new UsersService();
