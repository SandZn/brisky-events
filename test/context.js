'use strict'
const render = require('brisky-core/render')
const Element = require('brisky-core')
const test = require('tape')
const s = require('vigour-state/s')
const p = require('parse-element')
const trigger = require('../trigger')
Element.prototype.inject(require('../lib'))

test('context - fire events - restore context', function (t) {
  t.plan(3)
  const state = s({
    clients: {
      child: {
        cool: true
      },
      a: {
        text: 'a'
      },
      b: {
        text: 'b'
      }
    }
  })

  const cool = state.clients.child.prototype.cool
  const orig = cool.path()
  const app = render({
    types: {
      a: {
        $: 'clients.a.cool',
        text: { $: 'text' },
        on: {
          mousedown (event, stamp) {
            t.equal('state' in event, true, 'has state in event')
            console.log(event.state.path())
            // how to solve how to solve -- context is walker in state not in event
            // what do we need/want
            // dont realy no the problem where trying to solve here...
          }
        }
      }
    },
    a: { type: 'a' }
  }, state)
  trigger(app.childNodes[0], 'mousedown')
  t.same(cool.path(), orig, 'restores previous context')
})
