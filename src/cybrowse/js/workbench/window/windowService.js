import {
  EventEmitter
} from 'events'
import Emitter from '../../base/emitter/emitter'
import $ from 'jquery'
import WindowLayoutService, {WindowLayoutServiceContainer} from './windowLayoutService'
import ToolbarService from '../toolbar/toolbarService'
import ViewPanelService from '../viewPanel/viewPanelService'
import ControlPanelService from '../controlPanel/controlPanelService'
import TablePanelService from '../tablePanel/tablePanelService'
import MenubarService from '../menubar/menubarService'
import _ from 'lodash'

export default class WindowService extends EventEmitter {
  constructor(container) {
    super()
    this.container = document.createElement('div')
    this._onResize = new Emitter()
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.initServices()
    this.registerCommand()
    this.registerListener()

  }
  get onDidResize() {
    return this._onResize.event
  }
  initServices() {
    const services = Object.assign({}, this.context.services)
    this.services = services
    const context = {
      services: services
    }
    const windowLayoutService = new WindowLayoutService()
    services.windowLayoutService = windowLayoutService

    const menubarService = new MenubarService()
    services.menubarService = menubarService

    const toolbarService = new ToolbarService()
    services.toolbarService = toolbarService

    const viewPanelService = new ViewPanelService()
    services.viewPanelService = viewPanelService

    const controlPanelService = new ControlPanelService()
    services.controlPanelService = controlPanelService

    const tablePanelService = new TablePanelService()
    services.tablePanelService = tablePanelService

    const container = $('<div/>').appendTo(document.body).get(0)
    windowLayoutService.init({ container: container }, context)

    toolbarService.init({
      container: this.getContainer(WindowLayoutServiceContainer.toolbar)
    }, context)
    menubarService.init({
      container: this.getContainer(WindowLayoutServiceContainer.menubar)
    }, context)
    viewPanelService.init({
      container: this.getContainer(WindowLayoutServiceContainer.viewPanel)
    }, context)
    controlPanelService.init({
      container: this.getContainer(WindowLayoutServiceContainer.controlPanel)
    }, context)
    tablePanelService.init({
      container: this.getContainer(WindowLayoutServiceContainer.tablePanel)
    }, context)
  }
  getContainer(containerName) {
    return this.services.windowLayoutService.getContainer(containerName)
  }
  registerCommand() {

  }
  registerListener() {
    $(window).resize(_.throttle(() => {
      this.services.windowLayoutService.resize()
    }, 100))
  }
  show() {
    console.log(123)
  }
}