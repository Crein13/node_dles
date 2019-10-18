require('dotenv').config();

module.exports = {
  /**
   * The name of the application
   */
  name: 'amber-framework',
  /**
   * The default environment
   */
  env: process.env.NODE_ENV,
  /**
   * Default debug settings
   */
  debug: process.env.DEBUG,
  /**
   * port if funs on server
   */
  port: process.env.PORT,
  /**
   * Boolean config to enable serverless
   */
  serverless: process.env.IS_SERVERLESS === 'true',
  /**
   * Source directory of resources to be autoloaded
   */
  sources: { 
    domain: ['src/domain'],
    app: ['src/app'],
    dataSource: ['src/infra/dataSources'],
    model: ['src/infra/models'],
    repository: ['src/infra/repositories'],
    middleware: ['src/interfaces/http/middlewares'],
    controller: ['src/interfaces/http/controllers'],
    router: 'src/interfaces/http/router.js'
  },
};
