const path = require('path');

const APP_DIR = path.join(__dirname, 'src');
const CONFIG_FILE = path.join(__dirname, './client-env.js');

module.exports = {
  resolve: {
    alias: {
      app: APP_DIR,
      config: CONFIG_FILE,
    },
  },
};
