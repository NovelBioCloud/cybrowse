import {
  EventEmitter
} from 'events'
import Emitter from '../../base/emitter'
import $ from 'jquery'
import WindowPanel, { WindowPanelContainer } from '../../platform/window/windowPanel'
import MessageControl from '../messageControl/messageControl'
import ToolbarControl from '../toolbar/toolbarControl'
import ViewPanelControl from '../viewPanel/viewPanelControl'
import ControlPanelControl from '../controlPanel/controlPanelControl'
import TablePanelControl from '../tablePanel/tablePanelControl'
import TableDatasourceControl from '../tablePanel/tableDatasourceControl'
import MenubarControl from '../menubar/menubarControl'
import CurrentBaseStyleControl from '../cytoscapeDataModel/currentBaseStyleControl'
import CurrentDataControl from '../cytoscapeDataModel/currentDataControl'
import CurrentStyleControl from '../cytoscapeDataModel/currentStyleControl'
import CurrentLayoutControl from '../cytoscapeDataModel/currentLayoutControl'
import _ from 'lodash'
import { dispose } from '../../base/lifecycle'
import cytoscapeEvents from '../../platform/constants/cytoscapeEvents'

/**
 * 实际业务运行服务，
 * 构造数据服务和视图服务，组装视图服务的功能
 */
export default class WindowControl extends EventEmitter {
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
    this.initControls()
    this.registerCommand()
    this.registerListener()
  }
  get onDidResize() {
    return this._onResize.event
  }
  initControls() {

    const currentBaseStyleControl = new CurrentBaseStyleControl()
    const currentStyleControl = new CurrentStyleControl()
    const currentDataControl = new CurrentDataControl()
    const currentLayoutControl = new CurrentLayoutControl()
    const windowPanel = new WindowPanel()
    const menubarControl = new MenubarControl()
    const toolbarControl = new ToolbarControl()
    const viewPanelControl = new ViewPanelControl()
    const controlPanelControl = new ControlPanelControl()
    const tablePanelControl = new TablePanelControl()
    const tableDatasourceControl = new TableDatasourceControl()
    const messageControl = MessageControl.instance()
    this.windowPanel = windowPanel
    this._toDispose.concat([menubarControl, toolbarControl,
      viewPanelControl, currentBaseStyleControl, controlPanelControl, tablePanelControl,
      tableDatasourceControl, currentDataControl, currentStyleControl, currentLayoutControl
    ])
    const controls = Object.assign({
      currentDataControl,
      currentStyleControl,
      currentLayoutControl,
      currentBaseStyleControl,
      menubarControl,
      toolbarControl,
      viewPanelControl,
      controlPanelControl,
      tablePanelControl,
      tableDatasourceControl,
      messageControl
    }, this.context.controls)
    this.controls = controls
    const context = {
      controls: controls
    }

    const container = $('<div/>').appendTo(document.body).get(0)
    windowPanel.init({ container: container }, context)
    windowPanel.ready()
    currentDataControl.init({
    }, context)
    currentBaseStyleControl.init({
      container: this.props.container
    }, context)
    currentStyleControl.init({
      currentBaseStyleControl
    }, context)
    menubarControl.init({
      container: this.getContainer(WindowPanelContainer.menubar)
    }, context)
    toolbarControl.init({
      container: this.getContainer(WindowPanelContainer.toolbar)
    }, context)
    controlPanelControl.init({
      container: this.getContainer(WindowPanelContainer.controlPanel)
    }, context)
    tableDatasourceControl.init({}, context)
    viewPanelControl.init({
      container: this.getContainer(WindowPanelContainer.viewPanel)
    }, context)
    tablePanelControl.init({
      container: this.getContainer(WindowPanelContainer.tablePanel)
    }, context)

    tableDatasourceControl.ready()
    tablePanelControl.ready()
    viewPanelControl.ready()
  }
  getContainer(containerName) {
    return this.windowPanel.getContainer(containerName)
  }
  registerCommand() {

  }
  registerListener() {

  }

  show() {
    const currentDataControl = this.controls.currentDataControl
    setTimeout(() => {
      currentDataControl.setData([{
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