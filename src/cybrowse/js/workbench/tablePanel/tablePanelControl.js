import { dispose } from '../../base/lifecycle'
import TablePanel from '../../platform/tablePanel/tablePanel'

/** 前台下部表格数据面板服务 */
export default class TablePanelControl {

  init(props, context) {
    this._toDispose = []
    this.props = props
    this.context = context
    this.controls = this.context.controls
  }
  ready() {
    const tablePanel = new TablePanel()
    this.tablePanel = tablePanel
    this.tablePanel.init(this.props, this.context)
    this.registerListener()
  }

  /** 注册事件 */
  registerListener() {
    const tableDatasourceControl = this.controls.tableDatasourceControl
    this._toDispose.push(tableDatasourceControl.onNodeChange((nodeDatas) => {
      this.setNodeData(nodeDatas)
    }))
    this._toDispose.push(tableDatasourceControl.onEdgeChange((edgeDatas) => {
      this.setEdgeData(edgeDatas)
    }))
  }
  /** 设置节点数据 */
  setNodeData(nodeDatas) {
    this.tablePanel.setNodeData(nodeDatas)
  }
  /** 设置连线数据 */
  setEdgeData(edgeDatas) {
    this.tablePanel.setEdgeData(edgeDatas)
  }
  dispose() {
    dispose(this._toDispose)
    this._toDispose = []
  }
  onTap(event) {
    console.log(event)
  }
}