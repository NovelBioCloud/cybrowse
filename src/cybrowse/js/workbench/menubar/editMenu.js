import $ from 'jquery'
import CommandService from '../command/commandService'
import KeybindingService from '../keybinding/keybindingService'
import CytoscapeService from '../cytoscape/cytoscapeService'
import FileSelector from '../../base/fileSelector/fileSelector'
const EditMenuCommands = {
  newEdit: 'command.editMenu.newEdit',
  openEdit: 'command.editMenu.openEdit'
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
        <button type='button' class='fn-edit-menu btn btn-default dropdown-toggle btn-sm' data-toggle='dropdown'>
          编辑(E)
        </button>
        <ul class='dropdown-menu' role='menu'>
          <li><a class='fn-new-edit' href='javascript:void(0)'>撤销</a></li>
          <li><a class='fn-open-edit' href='javascript:void(0)'>恢复</a></li>
        </ul>
      </div>
    `)
    $el.appendTo($(this.container))
    this.el = $el.get(0)
  }
  registerCommand() {
    const commandService = this.services.commandService
    commandService.registerCommand(EditMenuCommands.newEdit, {
      args: null,
      handle: () => {
        this.newEdit()
      }
    })
    commandService.registerCommand(EditMenuCommands.openEdit, {
      args: null,
      handle: () => {
        this.openEdit()
      }
    })
  }
  newEdit() {
    console.log('newEdit')
  }
  openEdit() {
    const cytoscapeService = this.services.cytoscapeService
    FileSelector.show({
      accept: ".jpg, .png, .jpeg, .tiff|images/*",
      onChange: (edits) => {
        console.log(edits)
      }
    })
    cytoscapeService.setData(null)
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
    $el.find('.fn-new-edit').on('click', () => {
      commandService.runCommand(EditMenuCommands.newEdit)
    })
    $el.find('.fn-open-edit').on('click', () => {
      commandService.runCommand(EditMenuCommands.openEdit)
    })
  }
  destroy() {
    this.$el.remove()
  }

}