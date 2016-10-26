# brisky-events

[![Build Status](https://travis-ci.org/vigour-io/brisky-events.svg?branch=master)](https://travis-ci.org/vigour-io/brisky-events)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/brisky-events.svg)](https://badge.fury.io/js/brisky-events)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/brisky-events/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/brisky-events?branch=master)

```javascript
const render = require('brisky/render')

const app = render({
  on: {
    down (e) {
      console.log('mouse-down triggered!', e)
    }
  }
})
```

## Methods:

By default all DOM events are caught and handled as expected. Some events are handled, as can be seen in this repository. Feel free to [add an issue here](https://github.com/vigour-io/brisky-events/issues), if you notice something is missing or not working as expected.

#### Normal events:

* [click](http://www.w3schools.com/jsref/event_onclick.asp)
* [down](http://www.w3schools.com/jsref/event_onmousedown.asp)
* [up](http://www.w3schools.com/jsref/event_onmouseup.asp)
* [hover](http://www.w3schools.com/jsref/event_onmouseover.asp)


#### Special events:

* [drag](http://www.w3schools.com/html/html5_draganddrop.asp)
* rightclick
* forcedown
* forceup
* forcechanged


#### Keyboard events:

* arrowleft
* arrowright
* arrowup
* arrowdown
* back
* menu
* enter
* rewind
* playbtn
* forward
* space
