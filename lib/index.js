'use strict'
const delegate = require('./delegate')
const addListener = require('./listener')

exports.inject = require('./property')

exports.define = {
  extend: {
    contextRemove (contextRemove, key, stamp) {
      if (this && this.val !== null) {
        this.hasEvents.remove(false)
      }
      contextRemove.call(this, key, stamp)
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
            addListener(key, (e) => delegate(key, e))
          }
          this._parent.set({ hasEvents: true }, false)
        }
        return isProperty.call(this, key)
      },
      contextRemove (contextRemove, key, stamp) {
        removeEvent(this, this[key], key)
        contextRemove.call(this, key, stamp)
      },
      addNewProperty (addNewProperty, key, val, stamp) {
        const ret = addNewProperty.call(this, key, val, stamp)
        if (val.createEvent) {
          this[key].createEvent()
        }
        return ret
      }
    },
    eventCache: { value: {} }
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

function hasEvents (on, properties, key) {
  const keys = on.keys()
  const child = on.child
  for (let i in keys) {
    if (keys[i] !== key && on[keys[i]] instanceof child) {
      return true
    }
  }
}

function removeEvent (target, property, key) {
  if (key[0] !== '_') {
    const properties = target.properties
    const parent = target._parent
    if (
      parent.val !== null &&
      parent.hasEvents &&
      !hasEvents(target, properties, key)
    ) {
      parent.hasEvents.remove(false)
    }
    if (property.removeEvent) {
      property.removeEvent()
    }
  }
}
