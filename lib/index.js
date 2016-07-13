'use strict'
const delegate = require('./delegate')
const addListener = require('./listener')

exports.inject = require('./property')

exports.define = {
  extend: {
    contextRemove (method, key, stamp) {
      console.log('HERE!', key, stamp)
      method.call(this, key, stamp)
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
      contextRemove (method, key, stamp) {
        console.log('EMITTERS -> HERE!', key, stamp)
        method.call(this, key, stamp)
      },
      removeProperty (removeProperty, property, key, stamp, noContext, noParent) {
        console.log('remove!', key)
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
        return removeProperty.call(this, property, key, stamp, noContext, noParent)
      },
      remove (remove, stamp, noContext, noParent) {
        console.log('remove')
        const parent = this._parent
        if (parent && parent.val !== null) {
          parent.hasEvents = null
        }
        return remove.call(this, stamp, noContext, noParent)
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
        // remove event important
        this.define({ removeEvent })
      }
    }
  }
}

function hasEvents (on, properties) {
  // when does this get called?
  for (let i in on) {
    if (i[0] !== '_' && !properties[i]) {
      return true
    }
  }
}
