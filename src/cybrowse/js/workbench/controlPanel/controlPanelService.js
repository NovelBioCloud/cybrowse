import $ from 'jquery'

import { dispose } from '../../base/lifecycle'
import ControlPanel from '../../platform/controlPanel/controlPanel'
import BaseStyleService from './baseStyleService'
import NodeStyleService from './nodeStyleService'
import EdgeStyleService from './edgeStyleService'

/**
 * 控制面板服务（controlPanel的封装类）
 * 界面中包括种主要的panel：
 *  menubarPanel-菜单栏
 *  toolbarPanel-工具栏
 *  controlPanel-控制面板
 *  viewPanel-cytoscape数据视图面板
 *  tablePanel-表格数据显示面板
 */
export default class ControlPanelService {
  constructor() {
    this._toDispose = []
  }
  init(props, context) {
    this.props = props
    this.context = context
    let currentBaseStyleService = context.services.currentBaseStyleService
    let currentDataService = context.services.currentDataService
    let currentStyleService = context.services.currentStyleService
    let baseStyleService = new BaseStyleService()
    let nodeStyleService = new NodeStyleService()
    let edgeStyleService = new EdgeStyleService()
    let controlPanel = new ControlPanel()
    controlPanel.init({
      container: this.props.container,
    }, context)
    baseStyleService.init({
      currentBaseStyleService,
      container: controlPanel.getContainer('baseStyle')
    }, context)
    nodeStyleService.init({
      currentDataService,
      currentStyleService,
      container: controlPanel.getContainer('node')
    }, context)
    edgeStyleService.init({
      currentDataService,
      currentStyleService,
      container: controlPanel.getContainer('edge')
    }, context)

  }
  dispose() {
    dispose(this._toDispose)
  }
}