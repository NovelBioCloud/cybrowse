import Menubar from '../../platform/menubar/menubar'
import { FileMenuCommands } from '../../platform/command/commands'
import FileImporter from '../../platform/fileImporter/fileImporter'
import PropertyImporter from '../../platform/propertyImporter/propertyImporter'

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
  /** 导入文件，设置数据 */
  importFile() {
    new FileImporter().init({
      callback: (nodes, edges) => {
        const currentDataService = this.context.services.currentDataService
        currentDataService.setData([...nodes, ...edges])
      }
    }, this.context)
  }
  /** 导入属性，更新属性 */
  importProperty() {
    new PropertyImporter().init({
      callback: (datas, idName) => {
        const currentDataService = this.context.services.currentDataService
        currentDataService.updateProperty(datas, idName)
      }
    }, this.context)
  }
}