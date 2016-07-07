'use strict'
const getParent = require('brisky-core/lib/render/dom/parent')
const delegateEvent = require('./delegate')
const addListener = require('./listener')
const proto = require('vigour-base').prototype
const addNewProperty = proto.addNewProperty
const removeProperty = proto.removeProperty
const remove = proto.remove

exports.properties = {
  hasEvents: true,
  // @todo make default! -- use something else then storeState fix it in core
  storeState: {
    type: 'property',
    $: true,
    render: {
      state (target, state, type, stamp, subs, tree, id, pid) {
        if (type !== 'remove') {
          getParent(type, stamp, subs, tree, pid)._s = state
        }
      }
    }
  }
}

exports.on = {
  define: {
    extend: {
      isProperty (isProperty, key) {
        const cache = this.eventCache
        if (key !== 'child') {
          if (!cache[key]) {
            cache[key] = true
            addListener(key, (e) => delegateEvent(key, e))
          }
          this._parent.hasEvents = true
        }
        return isProperty.call(this, key)
      }
    },
    eventCache: { value: {} },
    remove () {
      const parent = this._parent
      if (parent && parent.val !== null) {
        parent.hasEvents = null
      }
      return remove.apply(this, arguments)
    },
    removeProperty (property, key) {
      if (key[0] !== '_') {
        const properties = this.properties
        if (!properties[key]) {
          const parent = this._parent
          if (parent.hasEvents && !hasEvents(this, properties)) {
            parent.hasEvents = null
          }
        } else if (property.removeEvent) {
          property.removeEvent()
        }
      }
      return removeProperty.apply(this, arguments)
    },
    addNewProperty (key, val) {
      const ret = addNewProperty.apply(this, arguments)
      if (val.createEvent) {
        this[key].createEvent()
      }
      return ret
    }
  },
  child: {
    properties: {
      createEvent (createEvent) {
        this.define({ createEvent })
      },
      removeEvent (removeEvent) {
        this.define({ removeEvent })
      }
    }
  }
}

function hasEvents (on, properties) {
  for (let i in on) {
    if (i[0] !== '_' && !properties[i]) {
      return true
    }
  }
}
