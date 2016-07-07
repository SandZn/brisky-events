'use strict'
// this is wrong
module.exports = function restoreState (restore) {
  console.log('?')
  if (restore) {
    for (let i = 0, l = restore.length; i < l; i = i + 3) {
      let state = restore[i]
      const target = restore[i + 1]
      const store = restore[i + 2]
      for (let j = 0, l = store.length; j < l; j = j + 2) {
        let context = state.__c
        let stored = store[j]
        if (stored === context) {
          context = context.__c
        } else {
          let level = store[j + 1]
          if (level === 1) {
            state = stored[state.key]
          } else {
            const path = []
            while (level--) {
              path.push(state.key)
              state = state._parent
            }
            for (let k = path.length - 1; k >= 0; k--) {
              stored = stored[path[k]]
            }
            state = stored
          }
          target._s = state
          break
        }
      }
    }
  }
}
