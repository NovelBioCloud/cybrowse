
import WindowService from '../window/windowService'
import $ from 'jquery'

/** 
 * 项目实例
 * 该类暂时没有特别的功能
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
