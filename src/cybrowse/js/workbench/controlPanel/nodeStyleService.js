import $ from 'jquery'
import NodeStyle from '../../platform/controlPanelPart/nodeStyle'
import { dispose } from '../../base/lifecycle'
import Emitter from '../../base/emitter'
/**节点样式服务 */
export default class NodeStyleService {
  constructor() {
    this._toDispose = []
  }
  init(props, context) {
    this.props = props
    this.context = context
    const currentStyleService = props.currentStyleService
    const currentDataService = props.currentDataService
    this.container = props.container
    const nodeStyle = new NodeStyle()
    this.nodeStyle = nodeStyle
    nodeStyle.init({
      container: this.container
    }, context)
    nodeStyle.ready()
    this._toDispose.push(currentStyleService.onChange(() => {
      this.updateStyle()
    }))
    this._toDispose.push(currentDataService.onChange(() => {
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