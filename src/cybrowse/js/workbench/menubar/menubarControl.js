import Menubar from '../../platform/menubar/menubar'
import { FileMenuCommands } from '../../platform/command/commands'
import FileImporter from '../../platform/fileImporter/fileImporter'
import PropertyImporter from '../../platform/propertyImporter/propertyImporter'

/**
 * 菜单服务，前台菜单面板
 */
export default class MenubarControl {
  init(props, context) {
    this.props = props
    this.context = context
    this.registerCommand()
    let menubar = new Menubar()
    menubar.init(props, context)
  }
  registerCommand() {

    let commandControl = this.context.controls.commandControl
    commandControl.registerCommand(FileMenuCommands.importFile, {
      handle: () => {
        this.importFile()
      }
    })
    commandControl.registerCommand(FileMenuCommands.importProperty, {
      handle: () => {
        this.importProperty()
      }
    })
  }
  /** 导入文件，设置数据 */
  importFile() {
    new FileImporter().init({
      callback: (nodes, edges) => {
        const currentDataControl = this.context.controls.currentDataControl
        currentDataControl.setData([...nodes, ...edges])
      }
    }, this.context)
  }
  /** 导入属性，更新属性 */
  importProperty() {
    new PropertyImporter().init({
      callback: (datas, idName) => {
        const currentDataControl = this.context.controls.currentDataControl
        currentDataControl.updateProperty(datas, idName)
      }
    }, this.context)
  }
}