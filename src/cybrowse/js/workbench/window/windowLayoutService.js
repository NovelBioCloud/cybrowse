import $ from 'jquery'
import Emitter from '../../base/emitter/emitter'

export const WindowLayoutServiceContainer = {
  menubar: 'menubar',
  toolbar: 'toolbar',
  controlPanel: 'controlPanel',
  viewPanel: 'viewPanel',
  tablePanel: 'tablePanel'
}

export const WindowLayoutServiceLayout = {
  default: 'default',
  custom: 'custom'
}

export default class WindowLayoutService {
  init(props, context) {
    this.container = props.container
    this._onDidResize = new Emitter()
    this.eleContainer = new Map()
    this.render()
    this.layout()
  }
  render() {
    const $el = $(`<div/>`, {
      class: 'window-layout'
    }).appendTo($(this.container))
    
    this.el = $el.get(0)
    
    const menubarContainer = $(`<div/>`, {
      class: 'fn-menubar-container'
    }).appendTo($el).get(0)
    this.menubarContainer = menubarContainer
    this.eleContainer.set(WindowLayoutServiceContainer.menubar, menubarContainer)

    const toolbarContainer = $(`<div/>`, {
      class: 'fn-toolbar-container'
    }).appendTo($el).get(0)
    this.toolbarContainer = toolbarContainer
    this.eleContainer.set(WindowLayoutServiceContainer.toolbar, toolbarContainer)

    const controlPanelContainer = $(`<div/>`, {
      class: 'fn-control-panel-container'
    }).appendTo($el).get(0)
    this.controlPanelContainer = controlPanelContainer
    this.eleContainer.set(WindowLayoutServiceContainer.controlPanel, controlPanelContainer)

    const viewPanelContainer = $(`<div/>`, {
      class: 'fn-view-panel-container'
    }).appendTo($el).get(0)
    this.viewPanelContainer = viewPanelContainer
    this.eleContainer.set(WindowLayoutServiceContainer.viewPanel, viewPanelContainer)
    
    const tablePanelContainer = $(`<div/>`, {
      class: 'fn-table-panel-container'
    }).appendTo($el).get(0)
    this.tablePanelContainer = tablePanelContainer
    this.eleContainer.set(WindowLayoutServiceContainer.tablePanel, tablePanelContainer)

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
    this.layoutName = layoutName || WindowLayoutServiceLayout.default
    switch (this.layoutName) {
      case WindowLayoutServiceLayout.default:
        const $el = $(`
          <div class:'window-layout'>
            <div class='fn-menubar'></div>
            <div class='fn-toolbar'></div>
            <div class='fn-table-panel'></div>
            <div style='display:flex;flex-direction: row;'>
              <div class='fn-control-panel' style='width:400px;background:#f2f2f2;'></div>
              <div class='fn-view-panel' style='flex:auto'></div>
            </div>
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
      case WindowLayoutServiceLayout.custom:
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