import $ from 'jquery'

import { dispose } from '../../base/lifecycle'
import ControlPanel from '../../platform/controlPanel/controlPanel'
import BaseStylePanel from './baseStylePanel'
import NodeStylePanel from './nodeStylePanel'
import EdgeStylePanel from './edgeStylePanel'

/**
 * 控制面板服务（controlPanel的封装类）
 * 界面中包括种主要的panel：
 *  menubarPanel-菜单栏
 *  toolbarPanel-工具栏
 *  controlPanel-控制面板
 *  viewPanel-cytoscape数据视图面板
 *  tablePanel-表格数据显示面板
 */
export default class ControlPanelControl {
  constructor() {
    this._toDispose = []
  }
  init(props, context) {
    this.props = props
    this.context = context
    let currentBaseStyleControl = context.controls.currentBaseStyleControl
    let currentDataControl = context.controls.currentDataControl
    let currentStyleControl = context.controls.currentStyleControl
    let baseStylePanel = new BaseStylePanel()
    let nodeStylePanel = new NodeStylePanel()
    let edgeStylePanel = new EdgeStylePanel()
    let controlPanel = new ControlPanel()
    controlPanel.init({
      container: this.props.container,
    }, context)
    baseStylePanel.init({
      currentBaseStyleControl,
      container: controlPanel.getContainer('baseStyle')
    }, context)
    nodeStylePanel.init({
      currentDataControl,
      currentStyleControl,
      container: controlPanel.getContainer('node')
    }, context)
    edgeStylePanel.init({
      currentDataControl,
      currentStyleControl,
      container: controlPanel.getContainer('edge')
    }, context)

  }
  dispose() {
    dispose(this._toDispose)
  }
}