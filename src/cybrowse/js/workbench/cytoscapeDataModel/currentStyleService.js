import { dispose } from '../../base/lifecycle'
import Emitter from '../../base/emitter'
import CytoscapeStyle from '../../platform/cytoscapeDataModel/cytoscapeStyle'

/**当前样式服务，包含了所有的样式数据，当样式数据被修改以后，触发相应的事件 */
export default class CurrentStyleService {
  constructor() {
    this._onChange = new Emitter()
    this._toDispose = []
    this.cytoscapeStyle = new CytoscapeStyle()
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.cytoscapeStyle.init(props,context)
    const currentBaseStyleService = this.context.services.currentBaseStyleService
    this._toDispose.push(currentBaseStyleService.onChange(() => {
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