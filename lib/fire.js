'use strict'
const attachEvent = require('./attach')
const vstamp = require('vigour-stamp')

module.exports = function fireEvent (type, e, data, listeners, bind, start, end) {
  const stamp = vstamp.create(type)
  attachEvent(e, data)
  for (let i in listeners) {
    listeners[i].call(bind, data, stamp)
  }
  vstamp.close(stamp)
}

// make tests for fire event

/*
  let state = target._s
  let data = { target }
  if (state) {
    let resolved = state.applyContext(target._sc)
    if (resolved) {
      target._s = state = resolved
      target._sc = state.storeContext()
    } else if (resolved === null) {
      target._s = null
      delete target._sc
      state = null
    }
    data.state = state
  }
*/
