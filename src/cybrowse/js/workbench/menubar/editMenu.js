import $ from 'jquery'
import CommandService from '../command/commandService'
import KeybindingService from '../keybinding/keybindingService'
import FileSelector from '../../base/fileSelector/fileSelector'
const EditMenuCommands = {
  undo: 'command.editMenu.undo',
  redo: 'command.editMenu.redo'
}
export {
  EditMenuCommands
}

export default class EditMenu {

  init(props, context) {
    let container = props.container
    this.container = container
    this.context = context
    this.initServices()
    this.render()
    this.registerCommand()
    this.registerListener()
  }
  render() {
    const $el = $(`
      <div class='btn-group'>
        <button type='button' class='fn-edit-menu btn btn-default dropdown-toggle' data-toggle='dropdown'>
          编辑(E)
        </button>
        <ul class='dropdown-menu' role='menu'>
          <li><a class='fn-undo' href='javascript:void(0)'>撤销</a></li>
          <li><a class='fn-redo' href='javascript:void(0)'>恢复</a></li>
        </ul>
      </div>
    `)
    $el.appendTo($(this.container))
    this.el = $el.get(0)
  }
  registerCommand() {
    const commandService = this.services.commandService
    commandService.registerCommand(EditMenuCommands.undo, {
      args: null,
      handle: () => {
        this.undo()
      }
    })
    commandService.registerCommand(EditMenuCommands.redo, {
      args: null,
      handle: () => {
        this.redo()
      }
    })
  }
  undo() {
    console.log('todo undo')
  }
  redo() {
    console.log('todo redo')
  }
  initServices() {
    const services = Object.assign({}, this.context.services)
    this.services = services
    const context = {
      services: services
    }
  }
  registerListener() {
    const $el = $(this.el)
    const commandService = this.services.commandService
    const keybindingService = this.services.keybindingService
    keybindingService.bind(['alt+e'], function (e) {
      $el.find('.fn-edit-menu').trigger('click')
      return false
    });
    $el.find('.fn-undo').on('click', () => {
      commandService.runCommand(EditMenuCommands.undo)
    })
    $el.find('.fn-redo').on('click', () => {
      commandService.runCommand(EditMenuCommands.redo)
    })
  }
  destroy() {
    this.$el.remove()
  }

}