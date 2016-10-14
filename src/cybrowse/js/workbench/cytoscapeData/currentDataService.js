import Emitter from '../../base/emitter/emitter'

export default class CurrentDataService {
  constructor() {
    this._onChange = new Emitter()
  }
  get onChange() {
    return this._onChange.event
  }
  init(props, context) {

  }
  getData() {
    return [...this.nodes, ...this.edges]
  }
  setData(elements) {
    this.nodes = []
    this.edges = []
    elements.forEach((item) => {
      if (item.data.target) {
        this.edges.push(item)
      } else {
        this.nodes.push(item)
      }
    })
    this._onChange.emit()
  }
}