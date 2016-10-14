import {
  EventEmitter
} from 'events'
import Emitter from '../../base/emitter/emitter'
import $ from 'jquery'
import WindowLayoutService, { WindowLayoutServiceContainer } from './windowLayoutService'
import ToolbarService from '../toolbar/toolbarService'
import ViewPanelService from '../viewPanel/viewPanelService'
import ControlPanelService from '../controlPanel/controlPanelService'
import TablePanelService from '../tablePanel/tablePanelService'
import MenubarService from '../menubar/menubarService'
import BaseStyleService from '../cytoscapeStyle/baseStyleService'
import CurrentDataService from '../cytoscapeData/currentDataService'
import CurrentStyleService from '../cytoscapeStyle/currentStyleService'
import NodeStyleService from '../cytoscapeStyle/nodeStyleService'
import EdgeStyleService from '../cytoscapeStyle/edgeStyleService'
import CurrentLayoutService from '../cytoscapeLayout/currentLayoutService'
import _ from 'lodash'
import dispose from '../../base/lifecycle/lifecycle'

export default class WindowService extends EventEmitter {
  constructor(container) {
    super()
    this._toDispose = []
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

    const windowLayoutService = new WindowLayoutService()
    const menubarService = new MenubarService()
    const toolbarService = new ToolbarService()
    const viewPanelService = new ViewPanelService()
    const baseStyleService = new BaseStyleService()

    const controlPanelService = new ControlPanelService()
    const tablePanelService = new TablePanelService()
    const currentDataService = new CurrentDataService()
    const currentStyleService = new CurrentStyleService()
    const currentLayoutService = new CurrentLayoutService()
    const services = Object.assign({
      baseStyleService,
      currentDataService,
      currentStyleService,
      currentLayoutService,
      windowLayoutService,
      menubarService,
      toolbarService,
      viewPanelService,
      controlPanelService,
      tablePanelService
    }, this.context.services)
    this.services = services
    const context = {
      services: services
    }

    const container = $('<div/>').appendTo(document.body).get(0)
    windowLayoutService.init({ container: container }, context)
    menubarService.init({
      container: this.getContainer(WindowLayoutServiceContainer.menubar)
    }, context)
    toolbarService.init({
      container: this.getContainer(WindowLayoutServiceContainer.toolbar)
    }, context)
    controlPanelService.init({
      container: this.getContainer(WindowLayoutServiceContainer.controlPanel)
    }, context)
    viewPanelService.init({
      container: this.getContainer(WindowLayoutServiceContainer.viewPanel)
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
    const viewPanelService = this.services.viewPanelService
    const currentDataService = this.services.currentDataService
    const currentStyleService = this.services.currentStyleService
    const currentLayoutService = this.services.currentLayoutService
    this._toDispose.push(currentDataService.onChange(() => {
      viewPanelService.updateData()
    }))
    this._toDispose.push(currentStyleService.onChange(() => {
      viewPanelService.updateStyle()
    }))
    this._toDispose.push(currentLayoutService.onChange(() => {
      viewPanelService.updateLayout()
    }))

    setTimeout(() => {
      currentDataService.setData([{
        "data": {
          "id": "68",
          "activityRatio": 0.0,
          "plotted": true,
          "description": "",
          "enabled": true,
          "shared_name": "Node 3",
          "moleculeType": "Kinase",
          "name": "Node 3",
          "randomInitialConcentration": false,
          "SUID": 68,
          "initialConcentration": 0,
          "selected": false,
          "levels": 100,
          "canonicalName": "test3"
        },
        "position": {
          "x": 73.0,
          "y": -112.0
        },
        "selected": false
      }, {
        "data": {
          "id": "66",
          "activityRatio": 0.0,
          "plotted": true,
          "description": "test2",
          "enabled": true,
          "shared_name": "Node 2",
          "moleculeType": "Kinase",
          "name": "Node 2",
          "randomInitialConcentration": false,
          "SUID": 66,
          "initialConcentration": 0,
          "selected": false,
          "levels": 100,
          "canonicalName": "test2"
        },
        "position": {
          "x": -284.0,
          "y": 72.0
        },
        "selected": false
      }, {
        "data": {
          "id": "64",
          "activityRatio": 0.0,
          "plotted": true,
          "description": "test1",
          "enabled": true,
          "shared_name": "Node 1",
          "moleculeType": "Gene",
          "name": "Node 1",
          "randomInitialConcentration": false,
          "SUID": 64,
          "initialConcentration": 0,
          "selected": false,
          "levels": 100,
          "canonicalName": "test1"
        },
        "position": {
          "x": -464.0,
          "y": -109.0
        },
        "selected": false
      }, {
        "data": {
          "id": "76",
          "source": "66",
          "target": "68",
          "shared_interaction": "interacts with",
          "increment": 1,
          "description": "",
          "k": 0.004,
          "enabled": true,
          "shared_name": "Node 2 (interacts with) Node 3",
          "scenario": 0,
          "name": "Node 2 (interacts with) Node 3",
          "interaction": "interacts with",
          "SUID": 76,
          "selected": false,
          "canonicalName": "test2 --> test3"
        },
        "selected": false
      }, {
        "data": {
          "id": "74",
          "source": "64",
          "target": "66",
          "shared_interaction": "interacts with",
          "increment": 1,
          "description": "",
          "k": 0.006,
          "enabled": false,
          "shared_name": "Node 1 (interacts with) Node 2",
          "scenario": 0,
          "name": "Node 1 (interacts with) Node 2",
          "interaction": "interacts with",
          "SUID": 74,
          "selected": false,
          "canonicalName": "test1 --> test2"
        },
        "selected": false
      }, {
        "data": {
          "id": "72",
          "source": "64",
          "target": "68",
          "shared_interaction": "interacts with",
          "increment": 1,
          "description": "",
          "k": 0.004,
          "enabled": true,
          "shared_name": "Node 1 (interacts with) Node 3",
          "scenario": 0,
          "name": "Node 1 (interacts with) Node 3",
          "interaction": "interacts with",
          "SUID": 72,
          "selected": false,
          "canonicalName": "test1 --> test3"
        },
        "selected": false
      }])
    }, 1000)
  }
  show() {
    console.log(123)
  }
  dispose() {
    dispose(this._toDispose)
  }
}