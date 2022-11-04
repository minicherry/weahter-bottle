const path = require('path');
const config = require('./config.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { program } = require('commander');
const packageJson = require('../package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const versionInfo = require('./version')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

program.version('0.0.1');
program
  .option('-o, --open', 'webpack --config')
  .option('-c, --config', 'webpack --config');

program.parse(process.argv);

module.exports = {
  entry: {
    main: './src/index.js',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        // commons: {
        //   test: /[\\/]node_modules[\\/]/,
        //   // cacheGroupKey here is `commons` as the key of the cacheGroup
        //   name (module) {
        //     const moduleFileName = module
        //       .identifier()
        //       .split('/')
        //       .reduceRight((item) => item)
        //       .split('.')[0];
        //     return `${moduleFileName}`;
        //   },
        //   chunks: 'all',
        // },
        // OrbitControls: {
        //   test: /OrbitControls/,
        //   name: 'OrbitControls',
        //   chunks: 'all',
        // },
        three: {
          test: /three/,
          name: 'three.' + versionInfo.ThreeVersion + '.min',
          chunks: 'all',
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'VIEWER',
      template: path.resolve(__dirname, '../src/index.html'),
      // inject: false
    }),
    new webpack.ids.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
    }),
    new webpack.DefinePlugin({
      __SDK_VERSION__: JSON.stringify(packageJson.version),
      __NODE_ENV__: JSON.stringify(process.env.NODE_ENV)
    }),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, 'src')
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   exclude: path.resolve(__dirname, '../node_modules'),
      //   enforce: 'pre'
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/three')
        ]
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src'),
        exclude: path.resolve(__dirname, '../node_modules'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'fonts/[name].[ext]',
            fallback: 'file-loader',
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 20000,
            fallback: 'file-loader',
            publicPath: config.build.assetsPublicPath,
            name: (process.env.NODE_ENV === 'production' ? config.prefix : '') + 'static/' + (config.assetsName ? config.assetsName : '') + '/[name].[ext]', // 回退使用file-loader时的名称
          }
        }]
      },
    ]
  },
  output: {
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js',
    path: path.resolve(__dirname, '../dist/')
  }
};
