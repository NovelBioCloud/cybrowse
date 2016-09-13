import $ from 'jquery'
import _ from 'lodash'
import Immutable from 'immutable'
import postal from 'postal'
import async from 'async'
import assert from 'assert'

class EventDispatcherService {
  dispatch(...arg) {
    postal.channel().publish(...arg)
  }
  channel() {
    return postal.channel()
  }
}

const eventDispatcher = new EventDispatcherService()

export default eventDispatcher
