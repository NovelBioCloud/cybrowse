import { dispose } from '../../base/lifecycle'
import Emitter from '../../base/emitter'
import CytoscapeStyle from '../../platform/cytoscapeDataModel/cytoscapeStyle'

/**
 * 当前样式服务，包含了所有的样式数据，当样式数据被修改以后，触发相应的事件
 * 维护样式数据信息，修改样式数据需要通过该类的实例修改
 */
export default class CurrentStyleControl {
  constructor() {
    this._onChange = new Emitter()
    this._toDispose = []
    this.cytoscapeStyle = new CytoscapeStyle()
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.cytoscapeStyle.init(props,context)
    const currentBaseStyleControl = this.context.controls.currentBaseStyleControl
    this._toDispose.push(currentBaseStyleControl.onChange(() => {
      this.updateBaseStyle()
    }))
  }
  get onChange() {
    return this._onChange.event
  }

  updateBaseStyle() {
    this.cytoscapeStyle.updateBaseStyle()
    this._onChange.emit()
  }
  update() {
    this._onChange.emit()
  }
  getStyle() {
    return this.cytoscapeStyle.getStyle()
  }
  dispose() {
    dispose(this._toDispose)
  }
}