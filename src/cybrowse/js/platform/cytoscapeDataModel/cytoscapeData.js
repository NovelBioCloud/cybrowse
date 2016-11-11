import Emitter from '../../base/emitter'
import _ from 'lodash'

/** 
 * 数据服务，包括了节点数据和连线数据
 * @see currentDataControl
 */
export default class CytoscapeData {
  constructor() {
    /** 节点数据 */
    this._nodes = []
    /** 连线数据 */
    this._edges = []
  }

  init(props, context) {
    this.props = props
    this.context = context
  }
  /** 返回节点数据和连线数据 */
  getData() {
    return [...this._nodes, ...this._edges]
  }
  /** 设置节点数据和连线数据 */
  setData(elements) {
    this._nodes = []
    this._edges = []
    // 将节点数据和连线数据分别装入nodes和edges中
    elements.forEach((item) => {
      if (item.data.target) {
        this._edges.push(item)
      } else {
        this._nodes.push(item)
      }
    })
  }
  /** 更新数据节点的属性 */
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
  /**
   * 获取节点数据
   */
  getNodeData() {
    return this._nodes
  }
  /** 获取连线数据 */
  getEdgeData() {
    return this._edges
  }
}