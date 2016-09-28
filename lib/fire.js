'use strict'
const attachEvent = require('./attach')
const vstamp = require('vigour-stamp')
const restore = require('./restore')

module.exports = function fireEvent (type, e, data, listeners, bind, noattach) {
  const stamp = vstamp.create(type)
  if (!noattach) { attachEvent(e, data) }
  restore(data)
  for (let i in listeners) {
    listeners[i].call(bind, data, stamp)
  }
  vstamp.close(stamp)
}
