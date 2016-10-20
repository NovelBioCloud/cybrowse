import $ from 'jquery'
import NodeStyle from '../../platform/cytoscapeStyle/nodeStyle'
import { dispose } from '../../base/lifecycle/lifecycle'
import Emitter from '../../base/emitter/emitter'

export default class NodeStyleService {
  constructor() {
    this._toDispose = []
  }
  init(props, context) {
    this.props = props
    this.context = context
    const currentStyleService = props.currentStyleService
    const currentDataService = props.currentDataService
    this._toDispose.push(currentStyleService.onChange(() => {
      this.updateStyle()
    }))
    this._toDispose.push(currentDataService.onChange(() => {
      this.updateStyle()
    }))
    this.container = props.container
    const nodeStyle = new NodeStyle()
    this.nodeStyle = nodeStyle
    nodeStyle.init({
      container: this.container
    }, context)
    nodeStyle.ready()
  }

  updateStyle() {
    this.nodeStyle.updateStyle()
  }
  dispose() {
    dispose(this._toDispose)
  }
}