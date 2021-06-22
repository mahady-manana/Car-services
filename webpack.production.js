const webpack = require('webpack');
const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const Dotenv = require('dotenv-webpack');
const CURRENT_WD = process.cwd();

module.exports = {
  name: 'app',
  mode: 'production',
  cache: true,
  entry: {
    main: [
      'babel-polyfill',
      'webpack-hot-middleware/client?reload=true',
      path.join(CURRENT_WD, './frontend/index.tsx'),
    ],
  },
  output: {
    path: path.join(CURRENT_WD, '/build/__chunks__/'),
    filename: 'bundle.js',
    chunkFilename: '[name].js',
    publicPath: '/__chunks__/',
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      { test: /\.(png|jpg|jpeg|svg)$/, use: ['file-loader'] },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: { name: '[name][hash].[ext]' },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      writeToFileEmit: true,
    }),
    new Dotenv(),
  ],
};
