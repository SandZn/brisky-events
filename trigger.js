'use strict'
module.exports = function trigger (node, type, event) {
  if (!event) {
    event = new global.Event(type)
  }
  node.dispatchEvent(event)
}
