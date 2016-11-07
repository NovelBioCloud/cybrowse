import Emitter from '../../base/emitter/emitter'
import _ from 'lodash'
import CytoscapeData from '../../platform/cytoscapeDataModel/cytoscapeData'
/** 
 * 数据服务
 */
export default class CurrentDataService {
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
  updateProperty(datas, idName) {
    this.cytoscapeData.updateProperty(datas,idName)
    const viewPanelService = this.context.services.viewPanelService
    viewPanelService.updateProperty(datas, idName)
    this._onUpdateProperty.emit()
  }
  getNodeData() {
    return this.cytoscapeData.getNodeData()
  }
  getEdgeData() {
    return this.cytoscapeData.getEdgeData()
  }
}