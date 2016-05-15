'use strict'
const render = require('brisky-core/render')
const Element = require('brisky-core')
const test = require('tape')

Element.prototype.inject(require('../lib'))

test('adding basic events', function (t) {
  var elem, node
  t.plan(3)

  elem = new Element({
    on: { mousedown () {} }
  })
  node = render(elem)

  t.true(elem.hasEvents, 'adds hasEvents on element')
  t.equals(node._, elem, 'stores element on node')
  t.false('_s' in node, 'doesn\'t store state on node when no state')
})