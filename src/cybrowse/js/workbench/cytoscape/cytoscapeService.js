import {EventEmitter} from 'events'
import WindowLayoutService, {WindowLayoutServiceContainer} from '../window/windowLayoutService'

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
    this.initServices()
    this.registerCommand()
    this.registerListener()

  }
  initServices() {
    const services = Object.assign({}, this.context.services)
    this.services = services
   
  }
 
  setData(data) {
    console.log(data)
  }
  registerCommand() {

  }
  registerListener() {

  }
}