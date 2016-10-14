import _ from 'lodash'
import EventMitter from 'events'

export default class BaseModel extends EventMitter {
  constructor() {
    super()
    this._entries = []
    this._defaultValue = -1
  }
  init(props, context) {
  }
  setEntries(_entries, _defaultValue = 0) {
    if (!_.isArray(_entries)) {
      throw new Error('input value must be an array')
    }
    this._entries = _entries
    this._setFocus(_defaultValue)
    this.emit('update')
  }
  getEntries() {
    return this._entries
  }
  add(entry) {
    this._entries.push(entry)
    this._defaultValue = this._entries.length
    this.emit('add', entry)
  }
  remove(entry) {
    let curFocus = this._defaultValue
    let entryIndex = _.findIndex(this._entries, entry)
    if (curFocus > entryIndex) {
      this._defaultValue = curFocus - 1
    }
    _.pull(this._entries, entry)
    this.emit('remove', entry)
  }
  getTabPanelEntries() {
    return this._entries
  }
  getFocus() {
    return this._defaultValue
  }
  setFocus(indexOrEntry) {
    this._setFocus(indexOrEntry)
    this.emit('focus', this._defaultValue)
  }
  _setFocus(indexOrEntry) {
    const index = indexOrEntry
    const entry = indexOrEntry
    if (_.isNumber(index)) {
      if (0 <= index && index < this._entries.length) {
        this._defaultValue = index
      }
    } else {
      let entryIndex = _.findIndex(this._entries, entry)
      if (entryIndex > -1) {
        this._defaultValue = entryIndex
      }
    }
  }
}