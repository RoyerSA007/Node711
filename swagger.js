const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentación de la API',
    version: '1.0.0',
    description: 'Documentación de la API con Swagger',
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Servidor del desarrollo'
    }
  ]
};

const options = {
  swaggerDefinition,
  // Rutas donde se encuentran los archivos con anotaciones Swagger
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
