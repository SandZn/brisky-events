'use strict'
const attach = require('./attach')
const vstamp = require('vigour-stamp')
const restore = require('./restore')

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
        let data = { target }
        restore(data)
        listener.emit(elem, attach(e, data), stamp)
        if (data.prevent) {
          break
        }
      }
    }
    if (stamp) {
      vstamp.close(stamp)
    }
  } while ((target = target.parentNode))
}
