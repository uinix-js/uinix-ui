module.exports = (on, config) => {
  require('@cypress/react/plugins/react-scripts')(on, config);
  return config;
};
