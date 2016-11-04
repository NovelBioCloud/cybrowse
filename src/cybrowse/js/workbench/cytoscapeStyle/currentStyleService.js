import { dispose } from '../../base/lifecycle/lifecycle'
import Emitter from '../../base/emitter/emitter'

/**当前样式服务 */
export default class CurrentStyleService {
  init(props, context) {
    this.props = props
    this.context = context
    const baseStyleService = props.baseStyleService
    this.baseStyleService = baseStyleService
    this._onChange = new Emitter()
    this._toDispose = []
    this._toDispose.push(baseStyleService.onChange(() => {
      this.updateBastStyle()
    }))
    this._style = this.baseStyleService.getStyle()
    this.updateBastStyle()
  }
  get onChange() {
    return this._onChange.event
  }

  updateBastStyle() {
    this._style = this.baseStyleService.getStyle()
    this._onChange.emit()
  }
  update() {
    this._onChange.emit()
  }
  getStyle() {
    return this._style
  }
  dispose() {
    dispose(this._toDispose)
  }
}