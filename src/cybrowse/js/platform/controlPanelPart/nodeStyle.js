import $ from 'jquery'
import NodeBackground from './node/background/background'
import NodeStyleLayout from './node/nodeStyleLayout'
/**
 * 节点样式管理类
 */
export default class NodeStyle {
  constructor() {

  }
  init(props, context) {
    this.props = props
    this.context = context
  }
  ready() {
    const props = this.props
    const context = this.context
    const nodeStyleLayout = new NodeStyleLayout()
    nodeStyleLayout.init({
      container: props.container
    })
    const nodeBackground = new NodeBackground()
    this.nodeBackground = nodeBackground
    nodeBackground.init({
      container: nodeStyleLayout.getContainer('background')
    }, context)
  }
  updateStyle() {
    this.nodeBackground.update()
  }
}