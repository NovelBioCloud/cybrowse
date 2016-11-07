
/**
 * 该文件定义了项目具备的全部命令功能的唯一Id,项目中执行某个功能，必须通过 commandService执行制定命令的id调用
 * toolbar 和 menubar 中的功能实现就是通过调用命令完成的 
 */

export const FileMenuCommands = {
  newFile: 'command.fileMenu.newFile',
  openFile: 'command.fileMenu.openFile',
  importFile: 'command.fileMenu.importFile',
  importProperty: 'command.fileMenu.importProperty'
}
export const EditMenuCommands = {
  undo: 'command.editMenu.undo',
  redo: 'command.editMenu.redo'
}

export const LayoutMenuCommands = {
  newLayout: 'command.LayoutMenu.newLayout',
  openLayout: 'command.LayoutMenu.openLayout'
}
export const SaveMenuCommand = {
  savePng: 'command:saveMenu.savePng',
  saveJpg: 'command:saveMenu.saveJpg',
  saveNetworkAndView: 'command:saveMenu.saveNetworkAndView',
  saveNetwork: 'command:saveMenu.saveNetwork',
  saveCsv: 'command:saveMenu.saveCsv'
}
export const StyleMenuCommands = {
  newStyle: 'command.styleMenu.newStyle',
  importStyle: 'command.styleMenu.importStyle',
  exportStyle: 'command.styleMenu.exportStyle',
}
export const ViewPanelCommand = {
  center: 'command:viewPanel.center',
  zoomOut: 'command:viewPanel.zoomOut',
  zoomIn: 'command:viewPanel.zoomIn',

}
export const HelpMenuCommands = {

}