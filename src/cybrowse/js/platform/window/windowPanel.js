import $ from 'jquery'
import Emitter from '../../base/emitter'

/**
 * WindowPanel中的特点面板名称
 */
export const WindowPanelContainer = {
  menubar: 'menubar',
  toolbar: 'toolbar',
  controlPanel: 'controlPanel',
  viewPanel: 'viewPanel',
  tablePanel: 'tablePanel'
}

/**
 * WindowPanel中使用的命令
 */
export const WindowPanelCommand = {
  showTable: 'command:window.layout.table.show',
  hideTable: 'command:window.layout.table.hide'
}

/**
 * WindowPanel中的布局类型,当前项目只实现了default
 */
export const WindowPanelLayout = {
  default: 'default',
  custom: 'custom'
}

/**
 * WindowPanel面板，完成了界面的所有展示功能
 */
export default class WindowPanel {
  
  /** 手动初始化 */
  init(props, context) {
    this.props = props
    this.context = context
    this.controls = context.controls
    this.container = props.container
    this._onDidResize = new Emitter()
    this.eleContainer = new Map()

  }
  /**
   * 依赖服务准备好以后，调用该方法
   */
  ready() {
    this.render()
    this.layout()
    this.registerCommand()
    this.registerEvent()
  }
  /**
   * 注册命令
   */
  registerCommand() {
    const commandControl = this.controls.commandControl
    commandControl.registerCommand(WindowPanelCommand.showTable, {
      args: null,
      handle: () => {
        this.showTable()
      }
    })
    commandControl.registerCommand(WindowPanelCommand.hideTable, {
      args: null,
      handle: () => {
        this.hideTable()
      }
    })
  }
  /** 显示表格 */
  showTable() {
    $(this.tablePanelContainer).show()
  }
  /** 隐藏表格 */
  hideTable() {
    $(this.tablePanelContainer).hide()
  }
  /** 注册键盘事件 */
  registerEvent() {
    const commandControl = this.controls.commandControl
    const keybindingControl = this.controls.keybindingControl
    keybindingControl.bind(['alt+up'], function (e) {
      commandControl.runCommand(WindowPanelCommand.showTable)
      return false
    });
    keybindingControl.bind(['alt+down'], function (e) {
      commandControl.runCommand(WindowPanelCommand.hideTable)
      return false
    });
  }
  /** 渲染视图 */
  render() {
    const $menubarContainer = $(`<div class='fn-menubar-container'/>`)
    this.menubarContainer = $menubarContainer.get(0)
    this.eleContainer.set(WindowPanelContainer.menubar, $menubarContainer.get(0))

    const $toolbarContainer = $(`<div class='fn-toolbar-container'/>`)
    this.toolbarContainer = $toolbarContainer.get(0)
    this.eleContainer.set(WindowPanelContainer.toolbar, $toolbarContainer.get(0))

    const $controlPanelContainer = $(`<div class='fn-control-panel-container'/>`)
    this.controlPanelContainer = $controlPanelContainer.get(0)
    this.eleContainer.set(WindowPanelContainer.controlPanel, $controlPanelContainer.get(0))

    const $viewPanelContainer = $(`<div 'class=fn-view-panel-container'/>`)
    this.viewPanelContainer = $viewPanelContainer.get(0)
    this.eleContainer.set(WindowPanelContainer.viewPanel, $viewPanelContainer.get(0))

    const $tablePanelContainer = $(`<div class='fn-table-panel-container'/>`).css({
      position: 'absolute',
      bottom: '0px',
      margin: 'auto',
      width: '100%',
      background: 'white',
      right: '0px',
      padding: '15px',
      'border-top': '1px solid #e0e0e0',
    })
    this.tablePanelContainer = $tablePanelContainer.get(0)
    this.eleContainer.set(WindowPanelContainer.tablePanel, $tablePanelContainer.get(0))

  }
  /**
   * 析构方法，当前对象需要被删除的时候，外部手动调用方法
   */
  dispose() {
    $(this.el).remove()
  }
  /** 获取视图中制定名称的面板 */
  getContainer(containerName) {
    return this.eleContainer.get(containerName)
  }
  /** 设置布局 */
  layout(layoutName) {
    if (this.layoutName && this.layoutName === layoutName) {
      return
    }
    this.layoutName = layoutName || WindowPanelLayout.default
    switch (this.layoutName) {
      case WindowPanelLayout.default:
        const $el = $(`
          <div class='container-fluid window-layout'>
            <div class='fn-menubar'></div>
            <div class='fn-toolbar'></div>
            <div style='display:flex;flex-direction: row;'>
              <div class='fn-control-panel' style='width:400px;background:#f2f2f2;padding:10px'></div>
              <div class='fn-view-panel' style='flex:auto'></div>
            </div>
            <div class='fn-table-panel'></div>
          </div>
        `).hide().appendTo($(this.container))
        $el.find('.fn-menubar').append($(this.menubarContainer))
        $el.find('.fn-toolbar').append($(this.toolbarContainer))
        $el.find('.fn-control-panel').append($(this.controlPanelContainer))
        $el.find('.fn-view-panel').append($(this.viewPanelContainer))
        $el.find('.fn-table-panel').append($(this.tablePanelContainer))
        $(this.el).remove()
        $el.show()
        this.el = $el.get(0)
        break;
      case WindowPanelLayout.custom:
        console.log('change layout custom')
        break;
    }
  }

}