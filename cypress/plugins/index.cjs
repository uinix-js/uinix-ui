const {startDevServer} = require('@cypress/webpack-dev-server');

const webpackConfig = require('../webpack.config.cjs');

module.exports = (on, config) => {
  on('dev-server:start', (options) => startDevServer({options, webpackConfig}));
  return config;
};
