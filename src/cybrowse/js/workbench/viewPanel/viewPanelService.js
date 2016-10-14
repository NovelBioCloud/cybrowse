
import $ from 'jquery'
import { saveAs } from 'file-saver'
import EventMitter from 'events'
import Cytoscape from './cytoscape'
import dispose from '../../base/lifecycle/lifecycle'
import CommandService from '../command/commandService'
import KeybindingService from '../keybinding/keybindingService'
import { SaveMenuCommand } from '../menubar/saveMenu'
export const ViewPanelCommand = {
  center: 'command:viewPanel.center',
  zoomOut: 'command:viewPanel.zoomOut',
  zoomIn: 'command:viewPanel.zoomIn',

}
let events = {
  tapstart: '', tapdrag: '', tapdragover: '', tapdragout: '',
  tapend: '', tap: '', taphold: '', cxttapstart: '', cxttapend: '',
  cxttap: '', cxtdrag: '', cxtdragover: '', cxtdragout: '',
  boxstart: '', boxend: '', boxselect: '', box: ''
}
class ViewPanel extends EventMitter {

  constructor() {
    super()
  }

  init(props, context, options) {
    this.container = props.container
    this.props = props
    this.context = context
    this.render()
    this.initEvent()
  }
  render() {
    const $el = $('<div/>').appendTo($(this.container))
    this.el = $el.get(0)
    const cytoscapeContainer = $(`<div/>`, {
      class: 'cy-panel-service--cytoscape'
    }).appendTo($el)
    this.cytoscape = new Cytoscape()
    this.cytoscape.init({
      container: cytoscapeContainer
    }, this.context)
    this.cy = this.cytoscape.get()
    this.cy.center()
  }
  initEvent() {
    Object.keys(events).forEach((eventName) => {
      this.cy.on(eventName, (event) => {
        this.emit(eventName, event)
      });
    })
    const commandService = this.context.services.commandService
    commandService.registerCommand(ViewPanelCommand.center, {
      args: null,
      handle: () => {
        this.cy.center()
      }
    })
    commandService.registerCommand(ViewPanelCommand.zoomOut, {
      args: null,
      handle: () => {
        const zoom = this.cy.zoom() + 0.1
        this.cy.zoom(zoom)
      }
    })
    commandService.registerCommand(ViewPanelCommand.zoomIn, {
      args: null,
      handle: () => {
        const zoom = this.cy.zoom() - 0.1
        this.cy.zoom(zoom)
      }
    })

    commandService.registerCommand(SaveMenuCommand.savePng, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    commandService.registerCommand(SaveMenuCommand.saveJpg, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    commandService.registerCommand(SaveMenuCommand.saveNetwork, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    commandService.registerCommand(SaveMenuCommand.saveNetworkAndView, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    commandService.registerCommand(SaveMenuCommand.saveStyle, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    commandService.registerCommand(SaveMenuCommand.saveCvs, {
      args: null,
      handle: () => {
        console.log(todo)
      }
    })
    const keybindingService = this.context.services.keybindingService
    keybindingService.bind(['ctrl+shift+c'], function (e) {
      commandService.runCommand(ViewPanelCommand.center)
      return false
    });

    keybindingService.bind(['ctrl+shift++'], function (e) {
      commandService.runCommand(ViewPanelCommand.zoomOut)
      return false
    });

    keybindingService.bind(['ctrl+shift+-'], function (e) {
      commandService.runCommand(ViewPanelCommand.zoomIn)
      return false
    });
  }
  setElements(elements) {
    this.cytoscape.cy.remove(this.cytoscape.cy.elements())
    this.cytoscape.cy.add(elements)
    console.log(this.cytoscape.cy.elements())
  }
  setStyles(style) {
    console.log(style.style)
    this.cy.style(style.style)
  }

  setLayout(layout) {
    this.cy.layout(layout)
  }
  dispose() {
  }
}

export default class ViewPanelService extends EventMitter {
  constructor() {
    super()
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.services = this.context.services
    this._toDispose = []
    this.render()
    this.initServices()
    this.registerListener()
  }
  initServices() {
    this.services = this.context.services

  }
  render() {
    if (!this.viewPanel) {
      this.viewPanel = new ViewPanel()
      this.viewPanel.init({
        container: this.getViewPanelContainer()
      }, this.context)
      const currentStyleService = this.context.services.currentStyleService
      const currentLayoutService = this.context.services.currentLayoutService
      this.viewPanel.setElements([])
      this.viewPanel.setStyles(currentStyleService.getStyle())
      this.viewPanel.setLayout(currentLayoutService.getLayout())
    }
  }

  remove() {
    if (this.ViewPanel) {
      dispose(this._toDispose)
      this.ViewPanel.dispose()
      this.ViewPanel == null
    }
  }
  dispose() {
    this.remove()
  }
  getViewPanelContainer() {
    if (!this.viewPanelContainer) {
      this.viewPanelContainer = $('<div/>', {
        class: 'cy-info-editor-service--cy-info-editor-container'
      }).appendTo($(this.props.container)).get(0)
    }
    return this.viewPanelContainer
  }

  registerListener() {
    Object.keys(events).forEach((eventName) => {
      this._toDispose.push((() => {
        let callback = (event) => {
          this.emit(eventName, event)
        }
        this.viewPanel.on(eventName, callback)
        return {
          toDispose: () => {
            this.viewPanel.off(eventName, callback)
          }
        }
      })())
    })
  }
  update() {
    const currentDataService = this.context.services.currentDataService
    const currentStyleService = this.context.services.currentStyleService
    const currentLayoutService = this.context.services.currentLayoutService
    this.viewPanel.setElements(currentDataService.getData())
    this.viewPanel.setStyles(currentStyleService.getStyle())
    this.viewPanel.setLayout(currentLayoutService.getLayout())
  }
  updateData() {
    const currentDataService = this.context.services.currentDataService
    this.viewPanel.setElements(currentDataService.getData())
  }
  updateStyle() {
    const currentStyleService = this.context.services.currentStyleService
    this.viewPanel.setStyles(currentStyleService.getStyle())
  }
  updateLayout() {
    const currentLayoutService = this.context.services.currentLayoutService
    this.viewPanel.setLayout(currentLayoutService.getLayout())
  }
}