import $ from 'jquery'

import LineColor from './edge/lineColor/lineColor'
import EdgeStyleLayout, { EdgeStyleLayoutContainer } from './edge/edgeStyleLayout'

/**
 * 连线的样式管理类 
 */
export default class EdgeStyle {
  constructor() {
  }

  init(props, context) {
    this.props = props
    this.context = context
  }
  ready() {
    const props = this.props
    const context = this.context
    const edgeStyleLayout = new EdgeStyleLayout()
    edgeStyleLayout.init({
      container: props.container
    })

    const lineColor = new LineColor()
    this.lineColor = lineColor
    lineColor.init({
      container: edgeStyleLayout.getContainer(EdgeStyleLayoutContainer.lineColor)
    }, context)
  }
  updateStyle() {
    this.lineColor.update()
  }
}