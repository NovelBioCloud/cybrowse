import $ from 'jquery'
import saveAs from 'file-saver'
import CommandService from '../command/commandService'
import KeybindingService from '../keybinding/keybindingService'
import FileSelector from '../../base/fileSelector/fileSelector'
import { SaveMenuCommand } from '../command/commands'

/**
 * 保存图片、样式相关的按钮
 */
export default class SaveMenu {

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
        <button type='button' class='fn-file-menu btn btn-default dropdown-toggle' data-toggle='dropdown'>
          保存&nbsp;(ALT+S)
        </button>
        <ul class='dropdown-menu' role='menu'>
          <li><a class='fn-save-png' href='javascript:void(0)'>保存为png图片</a></li>
          <li><a class='fn-save-jpg' href='javascript:void(0)'>保存为jpg图片</a></li>
          <li><a class='fn-save-network' href='javascript:void(0)'>保存网络</a></li>
          <li><a class='fn-save-network-view' href='javascript:void(0)'>保存网络和视图</a></li>
          <li><a class='fn-save-style' href='javascript:void(0)'>保存样式</a></li>
          <li><a class='fn-save-csv' href='javascript:void(0)'>保存为CSV</a></li>
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

  }

  registerListener() {
    const $el = $(this.el)
    const commandService = this.services.commandService
    const keybindingService = this.services.keybindingService
    keybindingService.bind(['alt+s'], function (e) {
      $el.find('.fn-file-menu').trigger('click')
      return false
    });
    $el.find('.fn-save-png').on('click', () => {
      commandService.runCommand(SaveMenuCommand.savePng)
    })
    $el.find('.fn-save-jpg').on('click', () => {
      commandService.runCommand(SaveMenuCommand.saveJpg)
    })
    $el.find('.fn-save-network-view').on('click', () => {
      commandService.runCommand(SaveMenuCommand.saveNetworkAndView)
    })
    $el.find('.fn-save-network').on('click', () => {
      commandService.runCommand(SaveMenuCommand.saveNetwork)
    })
    $el.find('.fn-save-style').on('click', () => {
      commandService.runCommand(SaveMenuCommand.saveStyle)
    })
    $el.find('.fn-save-csv').on('click', () => {
      commandService.runCommand(SaveMenuCommand.saveCsv)
    })
  }
  destroy() {
    this.$el.remove()
  }

}