
/**
 * 该文件定义了项目具备的全部命令功能的唯一Id,项目中执行某个功能，必须通过 commandService执行制定命令的id调用
 * toolbar 和 menubar 中的功能实现就是通过调用命令完成的 
 */
//文件菜单中使用到的命令：新建文件，打开文件，导入文件，导入属性文件
export const FileMenuCommands = {
  newFile: 'command.fileMenu.newFile',
  openFile: 'command.fileMenu.openFile',
  importFile: 'command.fileMenu.importFile',
  importProperty: 'command.fileMenu.importProperty'
}
//编辑菜单中使用到的命令：撤销上一步操作，重新执行上一步被撤销的操作
export const EditMenuCommands = {
  undo: 'command.editMenu.undo',
  redo: 'command.editMenu.redo'
}
//布局菜单中使用到的命令：创建新布局，打开布局
export const LayoutMenuCommands = {
  newLayout: 'command.LayoutMenu.newLayout',
  openLayout: 'command.LayoutMenu.openLayout'
}
//保存菜单中使用到的命令：保存Png，保存Jpg，保存网络图和样式，保存网络图数据，保存为csv数据
export const SaveMenuCommand = {
  savePng: 'command:saveMenu.savePng',
  saveJpg: 'command:saveMenu.saveJpg',
  saveNetworkAndView: 'command:saveMenu.saveNetworkAndView',
  saveNetwork: 'command:saveMenu.saveNetwork',
  saveCsv: 'command:saveMenu.saveCsv'
}
//样式菜单中使用到的命令：创建新样式，导入样式，导出样式
export const StyleMenuCommands = {
  newStyle: 'command.styleMenu.newStyle',
  importStyle: 'command.styleMenu.importStyle',
  exportStyle: 'command.styleMenu.exportStyle',
}
//视图菜单中使用到的命令：视图居中，视图放大，视图缩小
export const ViewPanelCommand = {
  center: 'command:viewPanel.center',
  zoomOut: 'command:viewPanel.zoomOut',
  zoomIn: 'command:viewPanel.zoomIn',

}
//帮助菜单中使用到的命令
export const HelpMenuCommands = {

}