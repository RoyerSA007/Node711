const usersRouter = require('./userRouter');
const categoriesRouter = require('./categoryRouter');
const brandsRouter = require('./brandRouter');
const productsRouter = require('./productRouter');

function routerAPI(app) {
  app.use('/users', usersRouter);
  app.use('/categories', categoriesRouter);
  app.use('/brands', brandsRouter);
  app.use('/products', productsRouter);
}

module.exports = routerAPI;
