'use strict'
const delegate = require('./delegate')
const addListener = require('./listener')

exports.inject = require('./property')

exports.define = {
  extend: {
    contextRemove (method, key, stamp) {
      method.call(this, key, stamp)
      if (this && this.val !== null && this.hasEvents && !this._emitters) {
        this.hasEvents.remove(false)
      }
    }
  }
}

exports.on = {
  define: {
    extend: {
      isProperty (method, key) {
        if (!this.types.base.isProperty.call(this, key)) {
          const cache = this.eventCache
          if (!cache[key]) {
            cache[key] = true
            addListener(key, (e) => delegate(key, e))
          }
          this._parent.set({ hasEvents: true }, false)
        }
        return method.call(this, key)
      },
      contextRemove (method, key, stamp) {
        removeEvent(this, this[key], key)
        method.call(this, key, stamp)
      },
      addNewProperty (method, key, val, stamp) {
        const ret = method.call(this, key, val, stamp)
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
      createEvent (method) {
        this.define({ createEvent: method })
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
