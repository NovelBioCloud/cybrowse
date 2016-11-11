import _ from 'lodash'
import { dispose } from '../../base/lifecycle'
import Emitter from '../../base/emitter'
import cytoscapeEvents from '../../platform/constants/cytoscapeEvents'

/**table 显示数据的方式 */
const DatasourceStrategy = {
  /**默认显示全部数据，viewPanel中有选择节点的时候，现实选择的节点信息 */
  auto: 'auto',
  /**总是显示全部数据*/
  all: 'all',
  /**总是只显示选择的数据 */
  select: 'select'
}
/** table数据源，依赖当前节点数据和样式数据 */
export default class TableDataSourceControl {
  constructor() {
    this._toDispose = []
    this._onNodeChange = new Emitter()
    this._onEdgeChange = new Emitter()
    this._datasourceStrategy = DatasourceStrategy.auto
  }
  /** 获取数据获取类型 */
  get datasourceStrategy() {
    return this._datasourceStrategy
  }
  /** 表格数据的显示策略 */
  set datasourceStrategy(value) {
    this._datasourceStrategy = value
    this.updateData()
  }
  get onNodeChange() {
    return this._onNodeChange.event
  }
  get onEdgeChange() {
    return this._onEdgeChange.event
  }

  init(props, context) {
    this.props = props
    this.context = context

  }
  ready() {
    const context = this.context
    this.currentDataControl = context.controls.currentDataControl
    this._toDispose.push(this.currentDataControl.onChange(() => {
      this.updateData()
    }))
    this._toDispose.push(this.currentDataControl.onUpdateProperty(() => {
      this.updateData()
    }))
    this.viewPanelControl = context.controls.viewPanelControl

    _.each(['tapend'], (eventName) => {
      const listener = (event) => {
        this.registerViewPanelListener(eventName, event)
      }
      this.viewPanelControl.on(eventName, listener)
      this._toDispose.push({
        dispose: () => {
          this.viewPanelControl.off(eventName, listener)
        }
      })
    })
  }
  registerViewPanelListener(eventName, event) {
    setTimeout(() => {
      this.updateData(event.cy)
    }, 100)
  }
  dispose() {
    dispose(this._toDispose)
  }
  updateData(cy) {
    let nodeData = this.currentDataControl.getNodeData()
    let edgeData = this.currentDataControl.getEdgeData()
    if (cy) {
      /**获取node数据 */
      const selectedNode = cy.elements("node:selected")
      if (selectedNode.length == 0) {
        this._onNodeChange.emit(nodeData)
      } else {
        const _nodeData = _.map(selectedNode, (item) => {
          return _.find(nodeData, (nodeItem) => {
            return nodeItem.data.id === item.data().id
          })
        })
        this._onNodeChange.emit(_nodeData)
      }
      /**获取edge数据 */
      const selectedEdge = cy.elements("edge:selected")
      if (selectedEdge.length == 0) {
        this._onEdgeChange.emit(edgeData)
      } else {
        const _edgeData = _.map(selectedEdge, (item) => {
          return _.find(edgeData, (edgeItem) => {
            return edgeItem.data.source === item.data().source && edgeItem.data.target === item.data().target
          })
        })
        this._onEdgeChange.emit(_edgeData)
      }
    } else {
      this._onNodeChange.emit(nodeData)
      this._onEdgeChange.emit(edgeData)
    }
  }
  selectElement(element) {
    console.log(element)
  }

}