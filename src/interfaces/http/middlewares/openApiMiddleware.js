const SwaggerUi = require('swagger-ui-express');

/**
 * 
 * @param {object} openApiJson Open API Specs JSON
 */
module.exports = (openApiJson) => {
  return [SwaggerUi.serve, SwaggerUi.setup(openApiJson)];
};
