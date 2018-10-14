/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import { dependencies as externals } from './app/package.json';
import { dependencies as possibleExternals } from './package.json';

// Find all the dependencies without a `main` property and add them as webpack externals
function filterDepWithoutEntryPoints(dep: string): boolean {
  // Return true if we want to add a dependency to externals
  try {
    // If the root of the dependency has an index.js, return true
    if (
      fs.existsSync(path.resolve(__dirname, `node_modules/${dep}/index.js`))
    ) {
      return false;
    }
    const pgkString = fs
      .readFileSync(path.resolve(__dirname, `node_modules/${dep}/package.json`))
      .toString();
    const pkg = JSON.parse(pgkString);
    const fields = ['main', 'module', 'jsnext:main', 'browser'];
    return !fields.some(field => field in pkg);
  } catch (e) {
    console.log(e);
    return true;
  }
}

export default {
  externals: [
    ...Object.keys(externals || {}),
    ...Object.keys(possibleExternals || {}).filter(filterDepWithoutEntryPoints)
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   * NOTE: if you change aliases, please also update .flowconfig
   */
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'app'),
      Components: path.resolve(__dirname, 'app/components'),
      Constants: path.resolve(__dirname, 'app/constants'),
      Containers: path.resolve(__dirname, 'app/containers'),
      Dist: path.resolve(__dirname, 'app/dist'),
      Reducers: path.resolve(__dirname, 'app/reducers'),
      Store: path.resolve(__dirname, 'app/store'),
      Styles: path.resolve(__dirname, 'app/styles'),
      Utils: path.resolve(__dirname, 'app/utils')
    },
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, 'app'), 'node_modules']
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.NamedModulesPlugin()
  ]
};
