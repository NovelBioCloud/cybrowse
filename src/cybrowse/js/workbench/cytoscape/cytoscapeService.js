import {EventEmitter} from 'events'
import LayoutService, {LayoutServiceContainer} from '../layout/layoutService'
import CyInfoEditorService from '../cyInfoEditor/cyInfoEditorService'
import CyPanelService from '../cyPanel/cyPanelService'

import CyDataService from './cyDataService'
import CyStyleService from './cyStyleService'

export default class CytoscapeService extends EventEmitter {
  constructor(container) {
    super()
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.container = props.container
    this.services = context.services
    this.initServices()
    this.registerCommand()
    this.registerListener()

  }
  initServices() {
    const services = this.getInfraServices()
    const layoutService = services.find(LayoutService)
    this.layoutService = layoutService

    const cyInfoEditorService = new CyInfoEditorService()
    const cyPanelService = new CyPanelService()
    const cyDataService = new CyDataService()
    const cyStyleService = new CyStyleService()

    services.add(CyInfoEditorService, cyInfoEditorService)
    services.add(CyPanelService, cyPanelService)
    services.add(CyDataService, cyDataService)
    services.add(CyStyleService, cyStyleService)

    cyInfoEditorService.init({
      container: this.getContainer(LayoutServiceContainer.cyInfoEditor)
    }, {
        services: services
      })
    cyPanelService.init({
      container: this.getContainer(LayoutServiceContainer.cyPanel)
    }, {
        services: services
      })
    cyDataService.init({}, { services: services })
    cyStyleService.init({}, { services: services })
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
  setData(data) {
    console.log(data)
  }
  registerCommand() {

  }
  registerListener() {

  }
}