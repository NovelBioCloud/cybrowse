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
    this.services = context.services
    this.render()
    this.registerCommand()
    this.registerListener()
  }
  render() {
    const $el = $(`
      <div class='btn-group'>
        <button type='button' class='fn-edit-menu btn btn-default dropdown-toggle btn-sm' data-toggle='dropdown'>
          文件(F)
        </button>
        <ul class='dropdown-menu' role='menu'>
          <li><a class='fn-new-edit' href='javascript:void(0)'>新建文件</a></li>
          <li><a class='fn-open-edit' href='javascript:void(0)'>打开文件</a></li>
          <li role="presentation" class="divider"></li>
          <li><a class='fn-new-edit' href='javascript:void(0)'>Dropdown link</a></li>
        </ul>
      </div>
    `)
    $el.appendTo($(this.container))
    this.el = $el.get(0)
  }
  registerCommand() {
    const commandService = this.services.find(CommandService)
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
    const cytoscapeService = this.services.find(CytoscapeService)
    FileSelector.show({
      accept: ".jpg, .png, .jpeg, .tiff|images/*",
      onChange: (edits) => {
        console.log(edits)
      }
    })
    cytoscapeService.setData(null)
  }
  registerListener() {
    const $el = $(this.el)
    const commandService = this.services.find(CommandService)
    const keybindingService = this.services.find(KeybindingService)
    keybindingService.bind(['alt+f'], function (e) {
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