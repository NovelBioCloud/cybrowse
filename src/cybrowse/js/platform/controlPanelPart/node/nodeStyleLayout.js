import $ from 'jquery'
import _ from 'lodash'
import EventEmitter from 'events'

/**
 * 节点样式布局容器常量
 */
const NodeStyleLayoutContainer = {
  background: 'background'
}
/**
 * 节点样式视图
 */
export default class NodeStyleLayout {
  constructor() {
    this._panels = new Map()
  }
  init(props, context) {
    const $el = $('<div/>').appendTo($(props.container))
    const $background = $('<div/>').appendTo($el)
    this._panels.set(NodeStyleLayoutContainer.background, $background)
  }
  getContainer(containerName) {
    return this._panels.get(containerName)
  }
}