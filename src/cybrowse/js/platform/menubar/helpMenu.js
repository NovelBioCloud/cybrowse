import $ from 'jquery'
import HelpSelector from '../../base/helpSelector/helpSelector'
import { HelpMenuCommands } from '../command/commands'

/** 帮助按钮 */
export default class HelpMenu {

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
        <button type='button' class='fn-help-menu btn btn-default dropdown-toggle' data-toggle='dropdown'>
          文件&nbsp;(ALT+F)
        </button>
        <ul class='dropdown-menu' role='menu'>
          <li><a class='fn-open-version' href='javascript:void(0)'>版本&nbsp;1.0</a></li>
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
    // commandService.registerCommand(HelpMenuCommands.newHelp, {
    //   args: null,
    //   handle: () => {
    //     this.newHelp()
    //   }
    // })
  }
  registerListener() {
    const $el = $(this.el)
    const commandService = this.services.commandService
    const keybindingService = this.services.keybindingService
    keybindingService.bind(['alt+f'], function (e) {
      $el.find('.fn-help-menu').trigger('click')
      return false
    });
    $el.find('.fn-new-help').on('click', () => {
      commandService.runCommand(HelpMenuCommands.newHelp)
    })

  }
  destroy() {
    this.$el.remove()
  }

}