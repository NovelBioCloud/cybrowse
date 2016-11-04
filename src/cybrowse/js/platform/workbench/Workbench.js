import {
  Singletons
} from '../base/common'
import {
  EventEmitter
} from 'events'
import $ from 'jquery'
import WindowService from './window/windowService'
import KeybindingService from './keybinding/keybindingService'
import Command from './command/command'
import CommandService from './command/commandService'
import ContextViewService from './contextView/contextViewService'

/**
 * 工作台，该项目的核心类
 */
export default class Workbench extends EventEmitter {

  constructor() {
    super()
  }

  init(props, context) {

    this.services = context.services.clone()
    this.initServices()
    this.registerCommand()
    this.registerListener()

  }
  initServices() {
    const services = this.services

    /**create workbenchManager*/
    const workbenchManager = new WorkbenchManager()
    this.workbenchManager = workbenchManager
    services.add(WorkbenchManager, workbenchManager)

    /**create contextViewService*/
    const contextViewService = new ContextViewService()
    services.add(ContextViewService, contextViewService)

    /**create keybindingService*/
    const keybindingService = KeybindingService.instance()
    services.add(KeybindingService, keybindingService)

    /**create commandService*/
    const commandService = new CommandService()
    services.add(CommandService, commandService)

    /**init */
    workbenchManager.init(this)
    commandService.init({}, {
      services
    })

    /**init windowService*/
    let $container = $('<div/>', {
      "class": 'class-workbench'
    })
    $container.appendTo($(document.body))
    const windowService = new WindowService()
    this.windowService = windowService
    windowService.init({
      container: $container.get(0)
    }, {
      services
    })


    /**show window*/
    windowService.show()
  }

  registerCommand() {
    const commandService = this.services.find(CommandService)
    commandService.registerCommand('command.workbench.testModule.testCommand', new Command({
      args: [123],
      handle: function () {
        console.log('testModule.testCommand', ...arguments)
      }
    }))
  }

  registerListener() {
    const commandService = this.services.find(CommandService)
    commandService.runCommand('command.workbench.testModule.testCommand', 1, 2, 3)
    this.on('finish', (value) => {
      console.log('finish', value)
    })
  }
}

export class WorkbenchManager extends EventEmitter {
  constructor() {
    super()
  }
  init(workbench) {
    this.workbench = workbench
  }
  getWorkbench() {
    return workbench
  }

}