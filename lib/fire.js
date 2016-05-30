'use strict'
const restoreState = require('./restore')
const attachEvent = require('./attach')
const vstamp = require('vigour-stamp')

module.exports = function fireEvent (type, e, data, listeners, bind, start, end) {
  const stamp = vstamp.create(type)
  const target = data.target
  const store = target._sc
  let restore
  if (store) {
    const state = data.state
    restore = [state, target, store]
    state.applyContext(store)
  }
  attachEvent(e, data)
  for (let i in listeners) {
    listeners[i].call(bind, data, stamp)
  }
  vstamp.close(stamp)
  restoreState(restore)
}
