'use strict'
const restoreState = require('./restore')
const attachEvent = require('./attach')
const vstamp = require('vigour-stamp')

module.exports = function delegateEvent (key, e) {
  var target = e.target
  var restore
  var stamp
  do {
    let elem = target._
    if (elem) {
      let listener = elem._emitters[key]
      if (listener) {
        if (!stamp) {
          stamp = vstamp.create(key)
        }
        const state = target._s
        const data = { target }
        if (state) {
          const store = target._sc
          if (store) {
            if (!restore) { restore = [] }
            restore.push(state, target, store)
            state.applyContext(store)
          }
          data.state = state
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
    restoreState(restore)
  }
}
