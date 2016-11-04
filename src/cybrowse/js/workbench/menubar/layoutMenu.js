import $ from 'jquery'
import CommandService from '../command/commandService'
import KeybindingService from '../keybinding/keybindingService'
import FileSelector from '../../base/fileSelector/fileSelector'
import { LayoutMenuCommands } from '../command/commands'
/**
 * 布局按钮类
 */
export default class LayoutMenu {

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
        <button type='button' class='fn-layout-menu btn btn-default dropdown-toggle' data-toggle='dropdown'>
          布局&nbsp;(ALT+L)
        </button>
        <ul class='fn-menu-items dropdown-menu' role='menu'>
        </ul>
      </div>
    `)
    $el.appendTo($(this.container))
    const currentLayoutService = this.services.currentLayoutService
    const layoutEntries = currentLayoutService.getLayoutEntries()
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
        currentLayoutService.changeLayout(layout.name)
        this.changeActiveLayout(layout)
      })
    })
    this.$el = $el
    this.changeActiveLayout(currentLayoutService.getLayout())
  }
  changeActiveLayout(layout) {
    // const $el = this.$el
    // $el.find('[layoutname]').css({
    //   color: 'initial'
    // })
    // $el.find(`[layoutname=${layout.name}]`).css({
    //   color: 'blue'
    // })
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

    const $el = this.$el
    const keybindingService = this.services.keybindingService
    keybindingService.bind(['alt+l'], function (e) {
      $el.find('.fn-layout-menu').trigger('click')

      return false
    });
  }
  destroy() {
    this.$el.remove()
  }

}