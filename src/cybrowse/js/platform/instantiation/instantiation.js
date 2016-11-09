
import WindowService from '../../workbench/window/windowService'
import $ from 'jquery'

/** 
 * 项目实例
 * 该类暂时没有特别的功能，未来有扩展可以在此处扩展，例如扩展多个WindowService，可以实现多个网络图的展示
 */
export default class Instantiation {


  init(props, context) {

    this.props = props
    this.context = context
    this.onClose = props.onClose
    this.initServices()

  }
  initServices() {
    this.services = this.context.services
    const windowService = new WindowService()
    this.services.windowService = windowService
    windowService.init({ onClose: this.onClose }, this.context)
    windowService.ready()
    windowService.show()
  }

}
