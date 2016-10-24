import _ from 'lodash'
/**数据模型类 */
export default class DataModel {
  constructor(currentDataService) {
    this._currentDataService = currentDataService
  }
  /**创建节点模型 */
  newNodeDataModel() {
    return new NodeDataModel(this._currentDataService)
  }
  /**创建连线模型 */
  newEdgeDataModel() {
    return new EdgeDataModel(this._currentDataService)
  }
}
/**节点和边的数据模型基类 */
class BaseModel {
  constructor(currentDataService) {
    this._currentDataService = currentDataService
  }
  /**获取属性名 */
  getAttrNames() {
    const datas = this.getData()
    const attrNames = _.uniq(_.concat(..._.map(datas, (data) => {
      return _.keys(data.data)
    })))
    return attrNames
  }
  /**获取属性值 */
  getAttrValues(attrName) {
    const datas = this.getData()
    const attrValues = _.uniq(_.map(datas, (data) => {
      return data.data[attrName]
    }))
    _.pull(attrValues, undefined, '')
    return attrValues
  }
}
/**节点数据模型类 */
class NodeDataModel extends BaseModel {
  constructor(currentDataService) {
    super(currentDataService)
  }
  /**获取节点数据 */
  getData() {
    return this._currentDataService.getNodeData()
  }
}
/**边的数据模型类 */
class EdgeDataModel extends BaseModel {
  constructor(currentDataService) {
    super(currentDataService)
  }
  /**获取边数据 */
  getData() {
    return this._currentDataService.getEdgeData()
  }
}