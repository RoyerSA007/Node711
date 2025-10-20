const express = require("express");
const routerApi = require('./routes/rutas');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Holiii bienvenido a mi servidor en express");
});

routerApi(app);

app.listen(port, () => {
  console.log(`My server is working on http://localhost:${port}`);
});

// app.post('/', (req, res) => {
//   const body = req.body;
//   res.json({
//     message: 'Created',
//     data: body
//   });
// });

// app.patch('/:id', (req, res) => {
//   const { id } = req.params;
//   const body = req.body;
//   res.json({
//     message: 'Updated',
//     data: body,
//     id
//   });
// });

// app.delete('/:id', (req, res) => {
//   const { id } = req.params;
//   res.json({
//     message: 'Deleted',
//     id
//   });
// });


// app.get('/nuevaruta', (req, res) => {
//   res.send("Holii esta es mi nueva ruta");
// });


// ========================================================================================
/* PARAMETROS TIPO RUTA
api.example.com/task/{id}
api.example.com/products/{id}
*/

// // Encapsular Id
// app.get('/products/:id', (req, res) => {
//   const {id} = req.params;
//   // Buscar el producto por su ID
//   res.json({
//     id,
//     name: 'Sabritas',
//     price: 100
//   });
// });
