import $ from 'jquery'
import EdgeStyle from '../../platform/controlPanelPart/edgeStyle'
import { dispose } from '../../base/lifecycle'
import Emitter from '../../base/emitter'
/**
 * 连线样式视图服务
 * 前台控制面板的edge编辑框
 * 根据当前样式和数据更新视图
 */
export default class EdgeStyleControl {
  constructor() {
    this._toDispose = []
  }
  init(props, context) {
    this.props = props
    this.context = context
    const currentStyleControl = props.currentStyleControl
    const currentDataControl = props.currentDataControl
    this.container = props.container
    const edgeStyle = new EdgeStyle()
    this.edgeStyle = edgeStyle
    edgeStyle.init({
      container: this.container
    }, context)
    edgeStyle.ready()
    this._toDispose.push(currentStyleControl.onChange(() => {
      this.updateStyle()
    }))
    this._toDispose.push(currentDataControl.onChange(() => {
      this.updateStyle()
    }))
  }

  updateStyle() {
    this.edgeStyle.updateStyle()
  }
  dispose() {
    dispose(this._toDispose)
  }
}