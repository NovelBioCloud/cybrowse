import $ from 'jquery'
import CommandService from '../command/commandService'
import KeybindingService from '../keybinding/keybindingService'
import CytoscapeService from '../cytoscape/cytoscapeService'
import FileSelector from '../../base/fileSelector/fileSelector'
const FileMenuCommands = {
  newFile: 'command.fileMenu.newFile',
  openFile: 'command.fileMenu.openFile'
}
export {
FileMenuCommands
}

export default class FileMenu {

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
        <button type='button' class='fn-file-menu btn btn-default dropdown-toggle btn-sm' data-toggle='dropdown'>
          文件(F)
        </button>
        <ul class='dropdown-menu' role='menu'>
          <li><a class='fn-new-file' href='javascript:void(0)'>新建文件</a></li>
          <li><a class='fn-open-file' href='javascript:void(0)'>打开文件</a></li>
          <li role="presentation" class="divider"></li>
          <li><a class='fn-new-file' href='javascript:void(0)'>Dropdown link</a></li>
        </ul>
      </div>
    `)
    $el.appendTo($(this.container))
    this.el = $el.get(0)
  }
  registerCommand() {
    const commandService = this.services.find(CommandService)
    commandService.registerCommand(FileMenuCommands.newFile, {
      args: null,
      handle: () => {
        this.newFile()
      }
    })
    commandService.registerCommand(FileMenuCommands.openFile, {
      args: null,
      handle: () => {
        this.openFile()
      }
    })
  }
  newFile() {
    console.log('newFile')
  }
  openFile() {
    const cytoscapeService = this.services.find(CytoscapeService)
    FileSelector.show({
      accept: ".jpg, .png, .jpeg, .tiff|images/*",
      onChange: (files) => {
        console.log(files)
      }
    })
    cytoscapeService.setData(null)
  }
  registerListener() {
    const $el = $(this.el)
    const commandService = this.services.find(CommandService)
    const keybindingService = this.services.find(KeybindingService)
    keybindingService.bind(['alt+f'], function (e) {
      $el.find('.fn-file-menu').trigger('click')
      return false
    });

    $el.find('.fn-new-file').on('click', () => {
      commandService.runCommand(FileMenuCommands.newFile)
    })
    $el.find('.fn-open-file').on('click', () => {
      commandService.runCommand(FileMenuCommands.openFile)
    })
  }
  destroy() {
    this.$el.remove()
  }

}