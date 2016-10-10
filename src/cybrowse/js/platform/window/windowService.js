import {
  EventEmitter
} from 'events'
import ToolbarService from '../toolbar/toolbarService'

export default class WindowService extends EventEmitter {
  constructor(container) {
    super()
    this.container = container
  }
  init(props, context) {
    this.props = props
    this.services = context.services.clone()
    this.initServices()
    this.registerCommand()
    this.registerListener()

  }
  initServices() {
    const services = this.services
    const toolbarService = new ToolbarService()
    toolbarService.init()
    services.add(ToolbarService, toolbarService)

  }
  registerCommand() {

  }
  registerListener() {

  }
  show() {
    console.log(123)
  }
}