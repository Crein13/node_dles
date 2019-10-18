require('module').Module._initPaths();
const { brew } = require('@amberjs/core');
const config = require('config');

brew(config, (err, brewed) => {
  if (err) throw err;
  const app = brewed.getServer();
  app.start().catch(error => {
    app.logger.error(error.stack);
    process.exit();
  });
});
