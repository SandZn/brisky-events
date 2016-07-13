'use strict'
const attach = require('./attach')
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
        let data = { target }
        if (state) {
          console.log('lets remove if its incorrect or at least make it ok')
          let resolved = state.applyContext(target._sc)
          if (resolved) {
            target._s = state = resolved
            target._sc = state.storeContext()
          } else if (resolved === null) {
            console.log('state got removed dangerous')
          }
          console.log(resolved)
          data.state = state
        }
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
