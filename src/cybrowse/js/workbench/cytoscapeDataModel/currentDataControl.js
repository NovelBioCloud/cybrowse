import Emitter from '../../base/emitter'
import _ from 'lodash'
import CytoscapeData from '../../platform/cytoscapeDataModel/cytoscapeData'
/** 
 * 数据服务，当前页面中 cytoscape 的节点和连线数据的维护类
 */
export default class CurrentDataControl {
  constructor() {
    this._onChange = new Emitter()
    this._onUpdateProperty = new Emitter()
    this.cytoscapeData = new CytoscapeData()
  }
  get onChange() {
    return this._onChange.event
  }
  get onUpdateProperty() {
    return this._onUpdateProperty.event
  }
  init(props, context) {
    this.props = props
    this.context = context
  }
  getData() {
    return this.cytoscapeData.getData()
  }
  setData(elements) {
    this.cytoscapeData.setData(elements)
    this._onChange.emit()
  }
  /** 修改属性 */
  updateProperty(datas, idName) {
    this.cytoscapeData.updateProperty(datas,idName)
    const viewPanelControl = this.context.controls.viewPanelControl
    viewPanelControl.updateProperty(datas, idName)
    this._onUpdateProperty.emit()
  }
  /** 获取节点数据 */
  getNodeData() {
    return this.cytoscapeData.getNodeData()
  }
  /** 获取连线数据 */
  getEdgeData() {
    return this.cytoscapeData.getEdgeData()
  }
}