'use strict'
const render = require('brisky-core/render')
const Element = require('brisky-core')
const test = require('tape')
const s = require('vigour-state/s')
// const p = require('parse-element')
const trigger = require('../trigger')
Element.prototype.inject(require('../lib'))

test('context - fire events - restore context', function (t) {
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

  const app = render({
    types: {
      a: {
        $: 'clients.a.cool',
        text: { $: 'text' },
        on: {
          mousedown (event, stamp) {
            t.equal(
              'state' in event,
              true,
              `has state in event for "${this.key}"`
            )
            t.same(
              event.state.path(),
              [ 'clients', this.key, 'cool' ],
              `correct path for "${this.key}"`
            )
            event.state.set(false)
          }
        }
      }
    },
    a: { type: 'a' },
    b: { type: 'a', $: 'clients.b.cool' }
  }, state)

  t.same(
    app.childNodes[0]._sc,
    state.clients.a.cool.storeContext(),
    'has stored context on node "a"'
  )
  trigger(app.childNodes[0], 'mousedown')
  t.equal(app.childNodes[0]._sc, void 0, 'cleared stored context on node')
  t.same(
    app.childNodes[1]._sc,
    state.clients.b.cool.storeContext(),
    'has stored context on node "b"'
  )
  trigger(app.childNodes[1], 'mousedown')
  t.equal(app.childNodes[1]._sc, void 0, 'cleared stored context on node')
  t.end()
})
