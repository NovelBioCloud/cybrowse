import $ from 'jquery'
import { HelpMenuCommands } from '../command/commands'

/** 
 * 菜单栏中的帮助按钮
 */
export default class HelpMenu {

  init(props, context) {
    this.props = props
    this.context = context
    let container = props.container
    this.container = container
    this.initControls()
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
  initControls() {
    const controls = Object.assign({}, this.context.controls)
    this.controls = controls
    const context = {
      controls: controls
    }
  }
  registerCommand() {

  }
  registerListener() {
    const $el = $(this.el)
    const commandControl = this.controls.commandControl
    const keybindingControl = this.controls.keybindingControl
    keybindingControl.bind(['alt+f'], function (e) {
      $el.find('.fn-help-menu').trigger('click')
      return false
    });
    $el.find('.fn-new-help').on('click', () => {
      commandControl.runCommand(HelpMenuCommands.newHelp)
    })

  }
  destroy() {
    this.$el.remove()
  }

}