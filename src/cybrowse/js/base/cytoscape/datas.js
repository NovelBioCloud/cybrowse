import _ from 'lodash'
export default class DataModel {
  constructor(currentDataService) {
    this._currentDataService = currentDataService
  }
  newNodeDataModel() {
    return new NodeDataModel(this._currentDataService)
  }
  newEdgeDataModel() {
    return new EdgeDataModel(this._currentDataService)
  }
}
class BaseModel {
  constructor(currentDataService) {
    this._currentDataService = currentDataService
  }
  getAttrNames() {
    const datas = this.getData()
    const attrNames = _.uniq(_.concat(..._.map(datas, (data) => {
      return _.keys(data.data)
    })))
    return attrNames
  }
  getAttrValues(attrName) {
    const datas = this.getData()
    const attrValues = _.uniq(_.map(datas, (data) => {
      return data.data[attrName]
    }))
    _.pull(attrValues, undefined, '')
    return attrValues
  }
}
class NodeDataModel extends BaseModel {
  constructor(currentDataService) {
    super(currentDataService)
  }
  getData() {
    return this._currentDataService.getNodeData()
  }
}

class EdgeDataModel extends BaseModel {
  constructor(currentDataService) {
    super(currentDataService)
  }
  getData() {
    return this._currentDataService.getEdgeData()
  }
}