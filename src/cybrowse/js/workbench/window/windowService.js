import {
  EventEmitter
} from 'events'
import Emitter from '../../base/emitter/emitter'
import $ from 'jquery'
import WindowPanel, { WindowPanelContainer } from '../../platform/window/windowPanel'
import MessageService from '../messageService/messageService'
import ToolbarService from '../toolbar/toolbarService'
import ViewPanelService from '../viewPanel/viewPanelService'
import ControlPanelService from '../controlPanel/controlPanelService'
import TablePanelService from '../tablePanel/tablePanelService'
import TableDatasourceService from '../tablePanel/tableDatasourceService'
import MenubarService from '../menubar/menubarService'
import BaseStyleService from '../cytoscapeStyle/baseStyleService'
import CurrentDataService from '../cytoscapeData/currentDataService'
import CurrentStyleService from '../cytoscapeStyle/currentStyleService'
import NodeStyleService from '../cytoscapeStyle/nodeStyleService'
import EdgeStyleService from '../cytoscapeStyle/edgeStyleService'
import CurrentLayoutService from '../cytoscapeLayout/currentLayoutService'
import _ from 'lodash'
import { dispose } from '../../base/lifecycle/lifecycle'
import cytoscapeEvents from '../../platform/constants/cytoscapeEvents'

/**
 * 实际业务运行服务
 */
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
    /**关闭窗口的时候的回调函数，由于网页版本没有关闭按钮，此方法只是为了未来添加关闭功能的时候调用**/
    this._onClose = this.props.onClose

  }
  ready() {
    this.initServices()
    this.registerCommand()
    this.registerListener()
  }
  get onDidResize() {
    return this._onResize.event
  }
  initServices() {

    const currentDataService = new CurrentDataService()
    const currentStyleService = new CurrentStyleService()
    const currentLayoutService = new CurrentLayoutService()
    const windowPanel = new WindowPanel()
    const menubarService = new MenubarService()
    const toolbarService = new ToolbarService()
    const viewPanelService = new ViewPanelService()
    const baseStyleService = new BaseStyleService()
    const controlPanelService = new ControlPanelService()
    const tablePanelService = new TablePanelService()
    const tableDatasourceService = new TableDatasourceService()
    const messageService = MessageService.instance()
    this.windowPanel = windowPanel
    this._toDispose.concat([menubarService, toolbarService,
      viewPanelService, baseStyleService, controlPanelService, tablePanelService,
      tableDatasourceService, currentDataService, currentStyleService, currentLayoutService
    ])
    const services = Object.assign({
      currentDataService,
      currentStyleService,
      currentLayoutService,
      baseStyleService,
      menubarService,
      toolbarService,
      viewPanelService,
      controlPanelService,
      tablePanelService,
      tableDatasourceService,
      messageService
    }, this.context.services)
    this.services = services
    const context = {
      services: services
    }

    const container = $('<div/>').appendTo(document.body).get(0)
    windowPanel.init({ container: container }, context)
    windowPanel.ready()
    menubarService.init({
      container: this.getContainer(WindowPanelContainer.menubar)
    }, context)
    toolbarService.init({
      container: this.getContainer(WindowPanelContainer.toolbar)
    }, context)
    controlPanelService.init({
      container: this.getContainer(WindowPanelContainer.controlPanel)
    }, context)
    tableDatasourceService.init({}, context)
    viewPanelService.init({
      container: this.getContainer(WindowPanelContainer.viewPanel)
    }, context)
    tablePanelService.init({
      container: this.getContainer(WindowPanelContainer.tablePanel)
    }, context)
    tableDatasourceService.ready()
    tablePanelService.ready()
    viewPanelService.ready()
  }
  getContainer(containerName) {
    return this.windowPanel.getContainer(containerName)
  }
  registerCommand() {

  }
  registerListener() {
    const viewPanelService = this.services.viewPanelService
    const currentDataService = this.services.currentDataService
    const currentStyleService = this.services.currentStyleService
    const currentLayoutService = this.services.currentLayoutService
    const tableDatasourceService = this.services.tableDatasourceService
    this._toDispose.push(currentDataService.onChange(() => {
      viewPanelService.updateData()
    }))
    this._toDispose.push(currentStyleService.onChange(() => {
      viewPanelService.updateStyle()
    }))
    this._toDispose.push(currentLayoutService.onChange(() => {
      viewPanelService.updateLayout()
    }))
  }

  show() {
    const currentDataService = this.services.currentDataService
    setTimeout(() => {
      currentDataService.setData([{
        "data": {
          "id": "68",
          "activityRatio": '0.0',
          "plotted": 'true',
          "description": "",
          "enabled": 'true',
          "shared_name": "Node 3",
          "moleculeType": "Kinase",
          "name": "Node 3",
          "randomInitialConcentration": 'false',
          "SUID": '68',
          "initialConcentration": '0',
          "selected": 'false',
          "levels": '100',
          "color": "#f2f2f3",
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
          "activityRatio": '0.0',
          "plotted": 'true',
          "description": "test2",
          "enabled": 'true',
          "shared_name": "Node 2",
          "moleculeType": "Kinase",
          "name": "Node 2",
          "randomInitialConcentration": 'false',
          "SUID": '66',
          "initialConcentration": '0',
          "selected": 'false',
          "levels": '100',
          "color": "#440044",
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
          "activityRatio": '0.0',
          "plotted": 'true',
          "description": "test1",
          "enabled": 'true',
          "shared_name": "Node 1",
          "moleculeType": "Gene",
          "name": "Node 1",
          "randomInitialConcentration": 'false',
          "SUID": '64',
          "initialConcentration": '0',
          "selected": 'false',
          "levels": '100',
          "color": "#997766",
          "canonicalName": "test1"
        },
        "position": {
          "x": -464.0,
          "y": -109.0
        },
        "selected": 'false'
      }, {
        "data": {
          "id": "76",
          "source": "66",
          "target": "68",
          "shared_interaction": "interacts with",
          "increment": '1',
          "description": "",
          "k": '0.004',
          "enabled": 'true',
          "shared_name": "Node 2 (interacts with) Node 3",
          "scenario": '0',
          "name": "Node 2 (interacts with) Node 3",
          "interaction": "interacts with",
          "SUID": '76',
          "selected": 'false',
          "canonicalName": "test2 --> test3"
        },
        "selected": false
      }, {
        "data": {
          "id": "74",
          "source": "64",
          "target": "66",
          "shared_interaction": "interacts with",
          "increment": '1',
          "description": "",
          "k": '0.006',
          "enabled": 'false',
          "shared_name": "Node 1 (interacts with) Node 2",
          "scenario": '0',
          "name": "Node 1 (interacts with) Node 2",
          "interaction": "interacts with",
          "SUID": '74',
          "selected": 'false',
          "canonicalName": "test1 --> test2"
        },
        "selected": false
      }, {
        "data": {
          "id": "72",
          "source": "64",
          "target": "68",
          "shared_interaction": "interacts with",
          "increment": '1',
          "description": "",
          "k": '0.004',
          "enabled": 'true',
          "shared_name": "Node 1 (interacts with) Node 3",
          "scenario": '0',
          "name": "Node 1 (interacts with) Node 3",
          "interaction": "interacts with",
          "SUID": '72',
          "selected": 'false',
          "canonicalName": "test1 --> test3"
        },
        "selected": false
      }])
    }, 1000)
  }

  onClose() {
    this.dispose()
    this.props && this.props.onClose && this.props.onClose()
  }
  dispose() {
    dispose(this._toDispose)
  }
}