'use strict'
const getParent = require('brisky-core/lib/render/dom/parent')

exports.properties = {
  hasEvents: {
    // make a flag when subscribed or something
    type: 'property',
    sync: false,
    // subscriptionType: 1, // make it spoecial -- need non-deep variant for this
    $: true,
    render: {
      state (target, s, type, stamp, subs, tree, id, pid) {
        const node = getParent(type, stamp, subs, tree, pid)
        if (node) {
          if (s) {
            node._sc = s.storeContext()
            node._s = s
          }
          if (!('_' in node)) {
            node._ = target.cParent()
          }
        }
      }
    }
  }
}
