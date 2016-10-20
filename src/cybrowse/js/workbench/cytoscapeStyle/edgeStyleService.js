import $ from 'jquery'
import EdgeStyle from '../../platform/cytoscapeStyle/edgeStyle'
import { dispose } from '../../base/lifecycle/lifecycle'
import Emitter from '../../base/emitter/emitter'

export default class EdgeStyleService {
  init(props, context) {
    this.props = props
    this.context = context
    const currentStyleService = props.currentStyleService
    this._onChange = new Emitter()
    this._toDispose = []
    this._toDispose.push(currentStyleService.onChange(() => {
      this.updateStyle()
    }))
 
    this.container = props.container
    const edgeStyle = new EdgeStyle()
    edgeStyle.init({
      container: this.container
    })
  }
  updateStyle() {
    this._onChange.emit()
  }
  dispose() {
    dispose(this._toDispose)
  }
}