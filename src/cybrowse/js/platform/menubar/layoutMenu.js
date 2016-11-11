import $ from 'jquery'
import { LayoutMenuCommands } from '../command/commands'
/**
 * 菜单栏中的布局按钮类
 * 包括功能：
 *  变换各种布局
 */
export default class LayoutMenu {

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
        <button type='button' class='fn-layout-menu btn btn-default dropdown-toggle' data-toggle='dropdown'>
          布局&nbsp;(ALT+L)
        </button>
        <ul class='fn-menu-items dropdown-menu' role='menu'>
        </ul>
      </div>
    `)
    $el.appendTo($(this.container))
    const currentLayoutControl = this.controls.currentLayoutControl
    const layoutEntries = currentLayoutControl.getLayoutEntries()
    layoutEntries.forEach((layout) => {
      const $menu = $(`
        <li>
          <a class='fn-layout' href='javascript:void(0)' layoutname='${layout.name}'>
            ${layout.name}
          </a>
        </li>
       `
      ).appendTo($el.find('.fn-menu-items'))
      $menu.find('a').click(() => {
        currentLayoutControl.changeLayout(layout.name)
        this.changeActiveLayout(layout)
      })
    })
    this.$el = $el
    this.changeActiveLayout(currentLayoutControl.getLayout())
  }
  changeActiveLayout(layout) {


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

    const $el = this.$el
    const keybindingControl = this.controls.keybindingControl
    keybindingControl.bind(['alt+l'], function (e) {
      $el.find('.fn-layout-menu').trigger('click')

      return false
    });
  }
  destroy() {
    this.$el.remove()
  }

}