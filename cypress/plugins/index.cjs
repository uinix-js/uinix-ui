const {startDevServer} = require('@cypress/webpack-dev-server');
const codeCoverageTask = require('@cypress/code-coverage/task');

const webpackConfig = require('../webpack.config.cjs');

module.exports = (on, config) => {
  codeCoverageTask(on, config);
  on('file:preprocessor', require('@cypress/code-coverage/use-babelrc.js'));
  on('dev-server:start', (options) => startDevServer({options, webpackConfig}));
  return config;
};
