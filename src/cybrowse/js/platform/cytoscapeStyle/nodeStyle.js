import $ from 'jquery'
import NodeBackground from './node/background/background'
import ViewService from './node/viewService'
export default class NodeStyle {
  constructor() {

  }
  init(props, context) {
    this.props = props
    this.context = context

    const viewService = new ViewService()
    viewService.init({
      container: props.container
    })
    const nodeBackground = new NodeBackground()
    this.nodeBackground = nodeBackground
    nodeBackground.init({
      container: viewService.getContainer('background')
    }, context)

  }
  updateStyle(){
    this.nodeBackground.update()
  }
}