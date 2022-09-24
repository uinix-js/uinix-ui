import {defineConfig} from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      bundler: 'webpack',
      framework: 'react',
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.js?$/,
              exclude: /node_modules/,
              use: 'babel-loader',
            },
          ],
        },
      },
    },
    specPattern: ['cypress/tests/**/*.js'],
    supportFile: false,
    video: false,
  },
});
