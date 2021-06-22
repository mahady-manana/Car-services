const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const CURRENT_WD = process.cwd();
const config = {
  name: 'server',
  target: 'node',
  entry: [path.join(CURRENT_WD, './servers/index.js')],
  output: {
    path: path.join(CURRENT_WD, '/build/server/'),
    filename: 'server.js',
    chunkFilename: '[name].node_chunk.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      { test: /\.(css|scss)$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|jpeg|svg|gif|pdf)$/, use: ['file-loader'] },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: { name: '[name][hash].[ext]' },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  plugins: [new Dotenv()],
};
module.exports = config;
