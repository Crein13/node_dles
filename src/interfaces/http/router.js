const { Router, static } = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const controller = require('./utils/createControllerRoutes');
const path = require('path');
const openApiDoc = require('./openApi.json');

module.exports = ({ config, containerMiddleware, loggerMiddleware, errorHandler, openApiMiddleware }) => {
  const router = Router();
  router.use(containerMiddleware);

  /* istanbul ignore if */
  if(config.env !== 'test') {
    router.use(loggerMiddleware);
  }

  const apiRouter = Router();

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors())
    .use(bodyParser.json())
    .use(compression())
    .use('/docs', openApiMiddleware(openApiDoc));

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   * Avoid hardcoding in this file as much. Deleting comments in this file
   * may cause errors on scaffoldings
   */

  // apiRouter.use('/users', controller('controllers/UsersController'));
  /* apiRoutes END */

  router.use('/api', apiRouter);
  router.use('/', static(path.join(__dirname, './public')));

  router.use(errorHandler);

  return router;
};
