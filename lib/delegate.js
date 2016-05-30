'use strict'
const attachEvent = require('./attach')
const vstamp = require('vigour-stamp')

module.exports = function delegateEvent (key, e) {
  var target = e.target
  var stamp
  do {
    let elem = target._
    if (elem) {
      let listener = elem._emitters[key]
      if (listener) {
        if (!stamp) {
          stamp = vstamp.create(key)
        }
        let state = target._s
        const c = target._sc
        if (c) {
          state = c.context
          const path = c.path
          const l = path.length
          for (let i = c.index; i < l; i++) {
            state = state.origin()[path[i]]
          }
        }
        const data = {
          target: target,
          state
        }

        listener.emit(elem, attachEvent(e, data), stamp)
        if (data.prevent) {
          break
        }
      }
    }
  } while ((target = target.parentNode))
  if (stamp) {
    vstamp.close(stamp)
  }
}
