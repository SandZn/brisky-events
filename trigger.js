'use strict'
module.exports = function trigger (node, type) {
  node.dispatchEvent(
    typeof type === 'object'
      ? type
      : new global.Event(type, { bubbles: true })
    )
}
