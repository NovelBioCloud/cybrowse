import $ from 'jquery'
import CommandService from '../command/commandService'
import KeybindingService from '../keybinding/keybindingService'
import {StyleMenuCommands} from '../command/commands'

export default class StyleMenu {

  init(props, context) {
    this.props = props
    this.context = context
    let container = props.container
    this.container = container
    this.initServices()
    this.render()
    this.registerCommand()
    this.registerListener()
  }
  render() {
    const $el = $(`
      <div class='btn-group'>
        <button type='button' class='fn-style-menu btn btn-default dropdown-toggle' data-toggle='dropdown'>
          样式&nbsp;(ALT+T)
        </button>
        <ul class='dropdown-menu' role='menu'>
          <li><a class='fn-new-style' href='javascript:void(0)'>新建样式文件</a></li>
          <li><a class='fn-open-style' href='javascript:void(0)'>导入样式</a></li>
          <li><a class='fn-open-style' href='javascript:void(0)'>导出样式</a></li>
        </ul>
      </div>
    `)
    $el.appendTo($(this.container))
    this.el = $el.get(0)
  }
  initServices() {
    const services = Object.assign({}, this.context.services)
    this.services = services
    const context = {
      services: services
    }
  }
  registerCommand() {
    const commandService = this.services.commandService
    commandService.registerCommand(StyleMenuCommands.newStyle, {
      args: null,
      handle: () => {
        this.newStyle()
      }
    })
    commandService.registerCommand(StyleMenuCommands.importStyle, {
      args: null,
      handle: () => {
        this.importStyle()
      }
    })
    commandService.registerCommand(StyleMenuCommands.exportStyle, {
      args: null,
      handle: () => {
        this.exportStyle()
      }
    })
  }
  newStyle() {
    console.log('newStyle')
  }
  importStyle() {
    console.log('importStyle')
  }
  exportStyle() {
    console.log('exportStyle')
  }
  registerListener() {
    const $el = $(this.el)
    const commandService = this.services.commandService
    const keybindingService = this.services.keybindingService
    keybindingService.bind(['alt+t'], function (e) {
      $el.find('.fn-style-menu').trigger('click')
      return false
    });
    $el.find('.fn-new-style').on('click', () => {
      commandService.runCommand(StyleMenuCommands.newStyle)
    })
    $el.find('.fn-import-style').on('click', () => {
      commandService.runCommand(StyleMenuCommands.importStyle)
    })
    $el.find('.fn-export-style').on('click', () => {
      commandService.runCommand(StyleMenuCommands.exportStyle)
    })
  }
  destroy() {
    this.$el.remove()
  }

}