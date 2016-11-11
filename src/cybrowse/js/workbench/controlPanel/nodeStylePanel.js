import $ from 'jquery'
import NodeStyle from '../../platform/controlPanelPart/nodeStyle'
import { dispose } from '../../base/lifecycle'
import Emitter from '../../base/emitter'
/**
 * 节点样式视图服务
 * 前台界面左侧的node编辑框
 * 根据数据和样式修改node节点样式
 */
export default class NodeStyleControl {
  constructor() {
    this._toDispose = []
  }
  init(props, context) {
    this.props = props
    this.context = context
    const currentStyleControl = props.currentStyleControl
    const currentDataControl = props.currentDataControl
    this.container = props.container
    const nodeStyle = new NodeStyle()
    this.nodeStyle = nodeStyle
    nodeStyle.init({
      container: this.container
    }, context)
    nodeStyle.ready()
    this._toDispose.push(currentStyleControl.onChange(() => {
      this.updateStyle()
    }))
    this._toDispose.push(currentDataControl.onChange(() => {
      this.updateStyle()
    }))
  }

  updateStyle() {
    this.nodeStyle.updateStyle()
  }
  dispose() {
    dispose(this._toDispose)
  }
}