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
        const data = {
          target: target,
          state: target._s
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
