'use strict'
const render = require('brisky-core/render')
const Element = require('brisky-core')
const test = require('tape')
const p = require('parse-element')
Element.prototype.inject(require('../lib'))

test('basic - add events', function (t) {
  const elem = new Element({
    on: { mousedown () {} }
  })
  const node = render(elem)
  t.true(elem.hasEvents, 'adds hasEvents on element')
  t.equals(node._, elem, 'stores element on node')
  t.false('_s' in node, 'doesn\'t store state on node when no state')
  t.end()
})

test('basic - prevent', function (t) {
  const elem = {
    on: { mousedown () {
      t.fail('should be prevented')
    } },
    nest: {
      on: {
        mousedown (event) {
          event.prevent = true
        }
      }
    }
  }
  const app = render(elem)

  console.log(p(app))
  // app
  t.end()
})
