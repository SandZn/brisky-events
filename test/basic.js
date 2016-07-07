'use strict'
const render = require('brisky-core/render')
const Element = require('brisky-core')
const test = require('tape')
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
