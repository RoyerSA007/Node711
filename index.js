const app = require('./app'); // Importamos la app configurada
const { logError, errorHandler } = require('./middleware/errorHandler');
const routerApi = require('./routes/rutas');
const setupSwagger = require('./swagger');

const port = 4000;

routerApi(app);

app.use(logError);
app.use(errorHandler);

setupSwagger(app);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
