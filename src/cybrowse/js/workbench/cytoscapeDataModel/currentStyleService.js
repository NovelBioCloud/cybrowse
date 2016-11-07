import { dispose } from '../../base/lifecycle/lifecycle'
import Emitter from '../../base/emitter/emitter'
import CytoscapeStyle from '../../platform/cytoscapeDataModel/cytoscapeStyle'

/**当前样式服务 */
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