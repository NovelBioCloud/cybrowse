import Emitter from '../../base/emitter/emitter'

export default class CurrentDataService {
  constructor() {
    this._onChange = new Emitter()
    this._nodes = []
    this._edges = []
  }
  get onChange() {
    return this._onChange.event
  }
  init(props, context) {

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
  getNodeData() {
    return this._nodes
  }
  getEdgeData() {
    return this._edges
  }
}