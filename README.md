# brisky-events
[![Build Status](https://travis-ci.org/vigour-io/brisky-events.svg?branch=master)](https://travis-ci.org/vigour-io/brisky-events)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/brisky-events.svg)](https://badge.fury.io/js/brisky-events)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/brisky-events/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/brisky-events?branch=master)

```javascript
const Brisky = require('brisky-core')
Brisky.prototype.inject(require('brisky-events))
const render = require('brisky-core/render)

const app = render({
  on: {
    down () {
      console.log('touch-down, mouse-down other downs!')
    }
  }
})
```
