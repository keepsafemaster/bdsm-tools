const webpack = require('webpack');
const { merge } = require("webpack-merge");
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');

const common = require("./webpack-common.config");
const cdnModules = require('./webpack-cdn-config');

const mode = 'production';
module.exports = merge(common, {
  mode,

  optimization: {
    minimize: true,
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
    new webpack.DefinePlugin({
      SCENE_NEGOTIATION_API_ROOT: JSON.stringify(
        'https://europe-west2-bdsm-tools.cloudfunctions.net/scene-negotiation'
      ),
    }),
    new WebpackCdnPlugin({
      modules: cdnModules(mode),
    }),
  ]
});
