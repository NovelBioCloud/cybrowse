import Menubar from './menubar'
import { FileMenuCommands } from '../command/commands'
import FileImporter from '../fileImporter/fileImporter'
import PropertyImporter from '../propertyImporter/propertyImporter'

/**
 * 菜单服务
 */
export default class MenubarService {
  init(props, context) {
    this.props = props
    this.context = context
    this.registerCommand()
    let menubar = new Menubar()
    menubar.init(props, context)
  }
  registerCommand() {

    let commandService = this.context.services.commandService
    commandService.registerCommand(FileMenuCommands.importFile, {
      handle: () => {
        this.importFile()
      }
    })
    commandService.registerCommand(FileMenuCommands.importProperty, {
      handle: () => {
        this.importProperty()
      }
    })
  }
  importFile() {
    new FileImporter().init({
      callback: (nodes, edges) => {
        const currentDataService = this.context.services.currentDataService
        currentDataService.setData([...nodes, ...edges])
      }
    }, this.context)
  }
  importProperty() {
    new PropertyImporter().init({
      callback: (datas, idName) => {
        const currentDataService = this.context.services.currentDataService
        currentDataService.updateProperty(datas, idName)
      }
    }, this.context)
  }
}