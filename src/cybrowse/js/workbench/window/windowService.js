import {
  EventEmitter
} from 'events'
import $ from 'jquery'
import LayoutService, {LayoutServiceContainer} from '../layout/layoutService'
import ToolbarService from '../toolbar/toolbarService'
import CytoscapeService from '../cytoscape/cytoscapeService'


export default class WindowService extends EventEmitter {
  constructor(container) {
    super()

  }
  init(props, context) {
    this.props = props
    this.container = props.container
    this.services = context.services
    this.initServices()
    this.registerCommand()
    this.registerListener()

  }
  initServices() {
    const services = this.getInfraServices()
    const layoutService = new LayoutService()
    this.layoutService = layoutService
    const toolbarService = new ToolbarService()
    const cytoscapeService = new CytoscapeService()
    services.add(LayoutService, layoutService)
    services.add(ToolbarService, toolbarService)
    services.add(CytoscapeService, cytoscapeService)
    layoutService.init({ container: this.container }, { services })
    toolbarService.init({
      container: this.getContainer(LayoutServiceContainer.toolbar)
    }, {
        services: services
      })
    cytoscapeService.init({}, { services: services })

  }
  getInfraServices() {
    if (!this.infraServices) {
      this.infraServices = this.services.clone()
    }
    return this.infraServices
  }
  getContainer(containerName) {
    return this.layoutService.getContainer(containerName)
  }
  registerCommand() {

  }
  registerListener() {

  }
  show() {
    console.log(123)
  }
}