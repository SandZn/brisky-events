'use strict'
const render = require('brisky-core/render')
const Element = require('brisky-core')
const test = require('tape')
const s = require('vigour-state/s')
const p = require('parse-element')
const trigger = require('../trigger')
Element.prototype.inject(require('../lib'))

test('context - fire events - restore context', function (t) {
  t.plan(2)
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
        $: 'clients.a',
        text: { $: 'text' },
        on: {
          mousedown (event, stamp) {
            t.equal('state' in event, true, 'has state in event')
            t.same(event.state.cool.path(), [ 'clients', 'a', 'cool' ], 'sets context')
          }
        }
      }
    },
    a: { type: 'a' }
  }, state)
  trigger(app.childNodes[0], 'mousedown')

  console.log(cool.path(), orig)
  // definitely wrong

  console.log(p(app))
})
