const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const products = require('./routes/productRouter');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/products', products);

mongoose.connect(
  'mongodb+srv://admin123:admin123@node711.hkwwhrn.mongodb.net/?retryWrites=true&w=majority&appName=Node711')
.then(() => console.log('Conexión a MongoDB exitosa'))
.catch(err => console.error('No se puede conectar a MongoDB:', err));

module.exports = app;
