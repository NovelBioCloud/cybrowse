import { dispose } from '../../base/lifecycle/lifecycle'
import TablePanel from '../../platform/tablePanel/tablePanel'


/** table面板服务 */
export default class TablePanelService {

  init(props, context) {
    this._toDispose = []
    this.props = props
    this.context = context
    this.services = this.context.services
  }
  ready() {
    const tablePanel = new TablePanel()
    this.tablePanel = tablePanel
    this.tablePanel.init(this.props, this.context)
    this.registerListener()
  }


  registerListener() {
    const tableDatasourceService = this.services.tableDatasourceService
    this._toDispose.push(tableDatasourceService.onNodeChange((nodeDatas) => {
      this.setNodeData(nodeDatas)
    }))
    this._toDispose.push(tableDatasourceService.onEdgeChange((edgeDatas) => {
      this.setEdgeData(edgeDatas)
    }))
  }
  setNodeData(nodeDatas) {
    this.tablePanel.setNodeData(nodeDatas)
  }
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