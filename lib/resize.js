'use strict'
const addListener = require('./listener')
var resizeListener

exports.inject = require('./')

exports.properties = {
  onResize: {
    render: {
      static (target, pnode) {
        if (!resizeListener) {
          resizeListener = addListener('resize', function () {
            // handle all resizers!
          })
        }
      }
    }
  }
}

exports.on = {
  properties: {
    resize: {
      createEvent () {
        const emitter = this._parent
        const element = emitter._parent._parent
        element.set({
          isWidget: true,
          onResize: true
        }, false)
      }
    }
  }
}
