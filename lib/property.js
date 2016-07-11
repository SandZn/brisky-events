'use strict'
const getParent = require('brisky-core/lib/render/dom/parent')

exports.properties = {
  hasEvents: {
    type: 'property',
    $: true,
    render: {
      static () {
        throw new Error('Currently do not support static hasEvents')
      },
      state  (target, state, type, stamp, subs, tree, id, pid) {
        var node = getParent(type, stamp, subs, tree, pid)
        if (state) {
          // needs to check since this can be used in an app without a state
          node._sc = state.storeContext()
          node._s = state
        }
        node._ = target.cParent()
      }
    }
  }
}
