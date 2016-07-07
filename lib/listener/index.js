'use strict'
const mock = require('./mock')

// fake event object ofcourse (for prevent default)
function Event (type) {
  this.type = type
}
Event.prototype.preventDefault = function () {
  console.log('prevent default?')
  // do somethign here
}

Object.defineProperty(global.Element.prototype, 'dispatchEvent', {
  value: function (event) {
    exec(this, event)
  }
})

function exec (node, event) {
  var store = mock[event.type]
  event.target = node
  if (store) {
    // no cache - when removing listeners in between)
    for (let i = 0; i < store.length; i++) {
      store[i].call(node, event)
    }
  }
}

global.Event = Event

global.document.addEventListener = function (key, fn) {
  console.log('add', arguments)
  var store = mock[key]
  if (!store) {
    store = mock[key] = []
  }
  store.push(fn)
}

global.document.removeEventListener = function (key, fn) {
  console.log('remove', arguments)
  const store = mock[key]
  if (store) {
    for (let i = 0, len = store.length; i < len; i++) {
      if (store[i] === fn) {
        store.splice(i, 1)
        break
      }
    }
  }
}

module.exports = require('./browser')
