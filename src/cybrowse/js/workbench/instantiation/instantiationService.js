import {
  EventEmitter
} from 'events'
import $ from 'jquery'
import Command from '../command/command'
import WindowService from '../window/windowService'

export default class InstantiationService extends EventEmitter {

  constructor() {
    super()
  }

  init(props, context) {
    this.props = props
    this.context = context
    this.initServices()
    this.registerCommand()
    this.registerListener()
    this.show()
  }
  initServices() {
    const services = Object.assign({}, this.context.services)
    this.services = services
    const context = {
      services: services
    }
    /**init windowService*/
    const windowService = new WindowService()
    windowService.init(null, context)
    this.services.windowService = windowService

  }

  registerCommand() {
    const commandService = this.context.services.commandService
    commandService.registerCommand('command.workbench.testModule.testCommand', new Command({
      args: [123],
      handle: function () {
        console.log('testModule.testCommand', ...arguments)
      }
    }))
  }

  registerListener() {
    const commandService = this.services.commandService
    commandService.runCommand('command.workbench.testModule.testCommand', 1, 2, 3)
    this.on('finish', (value) => {
      console.log('finish', value)
    })
  }
  show() {
    this.services.windowService.show()
  }
}
