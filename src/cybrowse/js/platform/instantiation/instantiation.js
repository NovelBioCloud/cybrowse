
import WindowControl from '../../workbench/window/windowControl'
import $ from 'jquery'

/** 
 * 项目实例
 * 该类暂时没有特别的功能，未来有扩展可以在此处扩展，例如扩展多个WindowControl，可以实现多个网络图的展示
 */
export default class Instantiation {


  init(props, context) {

    this.props = props
    this.context = context
    this.onClose = props.onClose
    this.initControls()

  }
  initControls() {
    this.controls = this.context.controls
    const windowControl = new WindowControl()
    this.controls.windowControl = windowControl
    windowControl.init({ onClose: this.onClose }, this.context)
    windowControl.ready()
    windowControl.show()
  }

}
