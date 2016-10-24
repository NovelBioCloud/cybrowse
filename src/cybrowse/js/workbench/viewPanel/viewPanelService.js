
import $ from 'jquery'
import { saveAs } from 'file-saver'
import EventMitter from 'events'
import Cytoscape from './cytoscape'
import { dispose } from '../../base/lifecycle/lifecycle'
import CommandService from '../command/commandService'
import KeybindingService from '../keybinding/keybindingService'
import { SaveMenuCommand, ViewPanelCommand } from '../command/commands'
import cytoscapeEvents from '../constants/cytoscapeEvents'
import ViewPanel from './viewPanel'

/**视图服务 */
export default class ViewPanelService extends EventMitter {
  constructor() {
    super()
    this._toDispose = []
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.services = this.context.services
  }
  ready() {
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
    Object.keys(cytoscapeEvents).forEach((eventName) => {
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
    this.viewPanel.setElements(currentDataService.getData())
    this.viewPanel.setStyles(currentStyleService.getStyle())
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