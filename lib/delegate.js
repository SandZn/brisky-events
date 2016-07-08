'use strict'
const attachEvent = require('./attach')
const vstamp = require('vigour-stamp')

const c = vstamp.close
vstamp.close = function (s) {
  console.log(s, 'CLOSE')
  console.log(vstamp._on, vstamp._done)
  c(s)
}

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
        const state = target._s
        const data = { target }
        if (state) {
          data.state = state
          // needs to be removed or something?
          // is it multiples that are wrong?
          const storage = state.storeContext()
          console.log(stamp)
          vstamp.done(stamp, () => {
            // really annoying its about nested paths
            // may be more difficult then it seems now
            // correcting content needs to clear when going trough the path
            // this is weird how to solve this...
            console.log('go', storage, state)
            state.applyContext(storage)
          })
        }
        listener.emit(elem, attachEvent(e, data), stamp)
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
