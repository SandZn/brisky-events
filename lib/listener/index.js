'use strict'
global.document.addEventListener = function () {
  console.log('add', arguments)
}
global.document.removeEventListener = function () {
  console.log('remove', arguments)
}

module.exports = require('./browser')
