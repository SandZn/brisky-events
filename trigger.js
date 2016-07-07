'use strict'
const fireEvent = require('./lib/fire')

module.exports = function trigger (node, type) {
  if (!node._) {
    throw new Error(`cannot find brisky-event on node for "${type}"`)
  }
  // node._.emit(type, node)
}
