'use strict'
const render = require('brisky-core/render')
const Element = require('brisky-core')
const test = require('tape')
const s = require('vigour-state')
Element.prototype.inject(require('../lib'))

test('context - fire events - restore context', function (t) {
  t.plan(1)
  const state = s({
    clients: {
      child: {
        cool: true
      }
    }
  })
  const app = render({
    type: {
      a: {
        $: 'clients.client',
        on: {
          mousedown (event, stamp) {
            t.equal('state' in event, true, 'has state in event')
            // event.state.set({

            // }, stamp)
          }
        }
      }
    }
  })
})
