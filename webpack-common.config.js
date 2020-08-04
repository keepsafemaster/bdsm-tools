const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  entry: './src/index.jsx',
  output: {
    filename: 'bundle/[name]/[hash].bundle.js',
    chunkFilename: 'bundle/[name]/[contenthash].chunk.js',
    path: path.resolve(__dirname, 'dist'),
  },

  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor/${packageName.replace('@', '')}`;
          },
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      },
    },
    runtimeChunk: 'single',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
         'style-loader',
         'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  modifyVars: {
                    'link-color': '#c41212',
                  },
                  javascriptEnabled: true,
                }
              }
            }
        ],
      },
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', "@babel/preset-react"]
          }
        }
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      base: '/',
    }),
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedChunksPlugin(),
  ],
}
