import $ from 'jquery'
import NodeStyle from '../../platform/cytoscapeStyle/nodeStyle'
import dispose from '../../base/lifecycle/lifecycle'
import Emitter from '../../base/emitter/emitter'

export default class NodeStyleService {
  init(props, context) {
    this.props = props
    this.context = context
    const currentStyleService = props.currentStyleService
    this._toDispose = []
    this._toDispose.push(currentStyleService.onChange(() => {
      this.updateStyle()
    }))
    this.container = props.container
    const nodeStyle = new NodeStyle()
    this.nodeStyle = nodeStyle
    nodeStyle.init({
      container: this.container
    }, context)
  }

  updateStyle() {
    this.nodeStyle.updateStyle()
  }
  dispose() {
    dispose(this._toDispose)
  }
}