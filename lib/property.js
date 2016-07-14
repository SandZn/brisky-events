'use strict'
const getParent = require('brisky-core/lib/render/dom/parent')

exports.properties = {
  hasEvents: {
    type: 'property',
    $: true,
    render: {
      state (target, state, type, stamp, subs, tree, id, pid) {
        const node = getParent(type, stamp, subs, tree, pid)
        if (node) {
          if (state) {
            node._sc = state.storeContext()
            node._s = state
          }
          if (!('_' in node)) {
            node._ = target.cParent()
          }
        }
      }
    }
  }
}
