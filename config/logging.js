const path = require('path');
const devLogFile = path.join(__dirname, '../logs/development.log');
const prodLogFile = path.join(__dirname, '../logs/production.log');

module.exports = {
  dev: {
    transports: [
      { transport: 'File', filename: devLogFile }
    ]
  },
  prod: {
    transports: [
      { transport: 'File', filename: prodLogFile }
    ]
  }
};
