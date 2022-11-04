const path = require('path');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');
const { getIpAddress } = require('./utils.js');
const config = require('./config.js');  

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: '/dist',
    host: config.dev.host,
    //port: config.dev.port,
    headers:{'Access-Control-Allow-Origin':'*'},
    // publicPath: config.dev.assetsPublicPath,
    // proxy: config.dev.proxyTable,
    historyApiFallback:{              // 当使用 HTML5 History API 时，任意的 404 响应是否需要被替代为 index.html。
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ]
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../static/'), to: 'static' }
      ]
    })
  ]
});