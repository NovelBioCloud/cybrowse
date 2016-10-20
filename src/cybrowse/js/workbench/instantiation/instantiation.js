
import WindowService from '../window/windowService'
import $ from 'jquery'

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
