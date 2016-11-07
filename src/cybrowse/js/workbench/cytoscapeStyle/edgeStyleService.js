import $ from 'jquery'
import EdgeStyle from '../../platform/cytoscapeStyle/edgeStyle'
import { dispose } from '../../base/lifecycle/lifecycle'
import Emitter from '../../base/emitter/emitter'
/**连线样式服务 */
export default class EdgeStyleService {
  constructor() {
    this._toDispose = []
  }
  init(props, context) {
    this.props = props
    this.context = context
    const currentStyleService = props.currentStyleService
    const currentDataService = props.currentDataService
    this.container = props.container
    const edgeStyle = new EdgeStyle()
    this.edgeStyle = edgeStyle
    edgeStyle.init({
      container: this.container
    }, context)
    edgeStyle.ready()
    this._toDispose.push(currentStyleService.onChange(() => {
      this.updateStyle()
    }))
    this._toDispose.push(currentDataService.onChange(() => {
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