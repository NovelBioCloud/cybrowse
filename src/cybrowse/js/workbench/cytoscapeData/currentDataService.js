import Emitter from '../../base/emitter/emitter'
import _ from 'lodash'

/** 
 * 数据服务
 */
export default class CurrentDataService {
  constructor() {
    this._onChange = new Emitter()
    this._onUpdateProperty = new Emitter()
    this._nodes = []
    this._edges = []
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
    return [...this._nodes, ...this._edges]
  }
  setData(elements) {
    this._nodes = []
    this._edges = []
    elements.forEach((item) => {
      if (item.data.target) {
        this._edges.push(item)
      } else {
        this._nodes.push(item)
      }
    })
    this._onChange.emit()
  }
  updateProperty(datas, idName) {
    _.each(this._nodes, (node) => {
      const data = _.find(datas, (data) => {
        return node.data.name == data[idName]
      })
      if (data && data.data) {
        _.extends(node.data, data.data)
      }
    })
    const viewPanelService = this.context.services.viewPanelService
    viewPanelService.updateProperty(datas, idName)
    this._onUpdateProperty.emit()
  }
  getNodeData() {
    return this._nodes
  }
  getEdgeData() {
    return this._edges
  }
}