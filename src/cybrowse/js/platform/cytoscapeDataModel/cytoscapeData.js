import Emitter from '../../base/emitter/emitter'
import _ from 'lodash'

/** 
 * 数据服务
 */
export default class CytoscapeData {
  constructor() {
    this._nodes = []
    this._edges = []
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
  }
  getNodeData() {
    return this._nodes
  }
  getEdgeData() {
    return this._edges
  }
}