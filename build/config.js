'use strict'

const path = require('path')
const utils = require('./utils')
const address = process.env.NODE_ENV === 'production' ? '' : utils.getIpAddress()
const port = 8080
const versionInfo = require('./version')
console.log(address);
const config = {
  prefix: '',
  assetsName: versionInfo.assetsName,
  projectPath: utils.resolve('/'),                                  // 项目根目录
  srcPath: utils.resolve('/src/'),                                  // 源文件目录

  ignoreJs: ['test'],                                               // 没有入口js文件的html名
  assetsSubDirectory: utils.resolve('/src/static/'),                // 静态资源目录(不处理的第三方代码)

  dev: {
    host:  address,
    port,

    devSourceMap: false,                                             // 是否开启SourceMap
    devtool: 'eval-source-map',

    assetsPublicPath: '/',                                           // 相对于服务器根目录的路径，用于加载资源。

    proxyTable: {                                                    // proxy代理
      '/api': 'http://' + address + ':' + port,
    }
  },

  build: {
    prodSourceMap: false,                                             // 是否开启SourcMap
    devtool: 'source-map',

    assetsRoot: path.resolve(__dirname, '../dist'),                  // 构建根目录
    assetsPublicPath: process.env.NODE_ENV === 'production'
      ? versionInfo.publicPath : '/'                                           // 相对于服务器根目录的路径，用于加载构建好的资源。
  }

}

module.exports = config
