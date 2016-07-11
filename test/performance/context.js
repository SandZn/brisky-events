'use strict'
const perf = require('vigour-performance')
const amount = 1e4
const render = require('brisky-core/render')
const Element = require('brisky-core')
const s = require('vigour-state/s')
Element.prototype.inject(require('../../lib'))

const state = s({
  child: {
    things: {
      are: {
        good: true
      }
    }
  },
  a: {}
})

render({
  field: {
    $: 'a.things.are.good',
    on: {
      down () {}
    }
  }
}, state)

perf(function baseLine () {
  for (let i = 0; i < amount; i++) {
  }
}, function event () {
  const good = state.a.things.are.good
  for (let i = 0; i < amount; i++) {
    good.set(i)
  }
})
