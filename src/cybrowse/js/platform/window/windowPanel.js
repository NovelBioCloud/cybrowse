import $ from 'jquery'
import Emitter from '../../base/emitter/emitter'

export const WindowPanelContainer = {
  menubar: 'menubar',
  toolbar: 'toolbar',
  controlPanel: 'controlPanel',
  viewPanel: 'viewPanel',
  tablePanel: 'tablePanel'
}

export const WindowPanelCommand = {
  showTable: 'command:window.layout.table.show',
  hideTable: 'command:window.layout.table.hide'
}
export const WindowPanelLayout = {
  default: 'default',
  custom: 'custom'
}

export default class WindowPanel {
  init(props, context) {
    this.props = props
    this.context = context
    this.services = context.services
    this.container = props.container
    this._onDidResize = new Emitter()
    this.eleContainer = new Map()

  }
  ready() {
    this.render()
    this.layout()
    this.registerCommand()
    this.registerEvent()
  }
  registerCommand() {
    const commandService = this.services.commandService
    commandService.registerCommand(WindowPanelCommand.showTable, {
      args: null,
      handle: () => {
        this.showTable()
      }
    })
    commandService.registerCommand(WindowPanelCommand.hideTable, {
      args: null,
      handle: () => {
        this.hideTable()
      }
    })
  }
  showTable() {
    $(this.tablePanelContainer).show()
  }
  hideTable() {
    $(this.tablePanelContainer).hide()
  }
  registerEvent() {
    const commandService = this.services.commandService
    const keybindingService = this.services.keybindingService
    keybindingService.bind(['alt+up'], function (e) {
      commandService.runCommand(WindowPanelCommand.showTable)
      return false
    });
    keybindingService.bind(['alt+down'], function (e) {
      commandService.runCommand(WindowPanelCommand.hideTable)
      return false
    });
  }
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

  dispose() {
    $(this.el).remove()
  }
  getContainer(containerName) {
    return this.eleContainer.get(containerName)
  }
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
  get onDidResize() {
    return this._onDidResize.event
  }
  resize() {
    this._onDidResize.emit()
  }
}