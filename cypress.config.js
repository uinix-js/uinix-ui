import codeCoverageTask from '@cypress/code-coverage/task';
import {defineConfig} from 'cypress';

export default defineConfig({
  component: {
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
    devServer: {
      bundler: 'webpack',
      framework: 'react',
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: ['istanbul'],
                },
              },
            },
          ],
        },
      },
    },
    specPattern: ['cypress/tests/**/*.js'],
    video: false,
  },
});
