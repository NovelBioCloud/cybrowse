import $ from 'jquery'
import _ from 'lodash'
import EventEmitter from 'events'
export const EdgeStyleLayoutContainer = {
  background: 'background',
  lineColor: 'lineColor'
}
/**
 * 连线样式视图面板
 */
export default class EdgeStyleLayout {
  constructor() {
    this._panels = new Map()
  }
  init(props, context) {
    const $el = $('<div/>').appendTo($(props.container))
    const $background = $('<div/>').appendTo($el)
    this._panels.set(EdgeStyleLayoutContainer.background, $background)
    const $lineColor = $('<div/>').appendTo($el)
    this._panels.set(EdgeStyleLayoutContainer.lineColor, $lineColor)
  }
  getContainer(containerName) {
    return this._panels.get(containerName)
  }
}