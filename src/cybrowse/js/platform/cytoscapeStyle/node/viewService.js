import $ from 'jquery'
import _ from 'lodash'
import EventEmitter from 'events'
const ViewServiceContainer = {
  background: 'background'
}
export default class ViewService {
  constructor() {
    this._panels = new Map()
  }
  init(props, context) {
    const $el = $('<div/>').appendTo($(props.container))
    const $background = $('<div/>').appendTo($el)
    this._panels.set(ViewServiceContainer.background, $background)
  }
  getContainer(containerName) {
    return this._panels.get(containerName)
  }
}