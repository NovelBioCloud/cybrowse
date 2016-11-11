import _ from 'lodash'
/**
 * 数据模型类，项目中通过该类来获取节点和连线的数据信息
 */
export default class DataModel {

  /**
   * 构造函数
   * @param currentDataControl 当前数据样式服务
   */
  constructor(currentDataControl) {
    this._currentDataControl = currentDataControl
  }
  /**
   * 创建节点模型
   * @return 节点数据模型
   */
  newNodeDataModel() {
    return new NodeDataModel(this._currentDataControl)
  }
  /**
   * 创建连线模型
   * @return 样式数据模型
   */
  newEdgeDataModel() {
    return new EdgeDataModel(this._currentDataControl)
  }
}
/**
 * 节点和边的数据模型基类，只是为了子类继承使用
 * @see NodeDataModel EdgeDataModel
 */
class BaseModel {
  /**
   * 构造函数
   * @param currentDataControl 当前数据样式服务
   */
  constructor(currentDataControl) {
    this._currentDataControl = currentDataControl
  }
  /**
   * 获取属性名 
   * @return 属性名
   */
  getAttrNames() {
    const datas = this.getData()
    const attrNames = _.uniq(_.concat(..._.map(datas, (data) => {
      return _.keys(data.data)
    })))
    return attrNames
  }
  /**
   * 获取属性值 
   * @return 属性值
   */
  getAttrValues(attrName) {
    const datas = this.getData()
    const attrValues = _.uniq(_.map(datas, (data) => {
      return data.data[attrName]
    }))
    _.pull(attrValues, undefined, '')
    return attrValues
  }
}
/**
 * 节点数据模型类，获取节点数据
 * @see lineColor.js background.js
 */
class NodeDataModel extends BaseModel {
  /**
   * 构造函数
   * @param currentDataControl 当前数据样式服务
   */
  constructor(currentDataControl) {
    super(currentDataControl)
  }
  /**
   * 获取节点数据
   * @return 获取当前节点数据
   */
  getData() {
    return this._currentDataControl.getNodeData()
  }
}
/**
 * 边的数据模型类，获取连线数据
 * @see lineColor.js background.js
 */
class EdgeDataModel extends BaseModel {
   /**
   * 构造函数
   * @param currentDataControl 当前数据样式服务
   */
  constructor(currentDataControl) {
    super(currentDataControl)
  }
  /**
   * 获取节点数据
   * @return 获取当前连线数据
   */
  getData() {
    return this._currentDataControl.getEdgeData()
  }
}