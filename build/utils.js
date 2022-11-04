'use strict'

var path = require('path')
var os = require('os')

module.exports = {
  resolve: function (dir) {
    return path.join(__dirname, '..', dir)
  },

  getIpAddress () {
    var network = os.networkInterfaces()
    var keys = Object.keys(network)

    for (var i = 0; i < keys.length; i++) {
      var cur = network[keys[i]]

      for (var j = 0; j < cur.length; j++) {
        // 192.168连接vpn办公地址
        if (cur[j].address.startsWith('10.252.') || cur[j].address.startsWith('192.168.') || cur[j].address.startsWith('172.20.')) {
          return cur[j].address
        }
      }
    }
  }
}
