import { dispose } from '../../base/lifecycle/lifecycle'
import TableNodePanel from './tableNodePanel'
import TableEdgePanel from './tableEdgePanel'
import TableTabPanelService from './tableTabPanelService'

/** table面板服务 */
export default class TablePanelService {

  init(props, context) {
    this._toDispose = []
    this.props = props
    this.context = context
    this.services = this.context.services
  }
  ready() {
    this.initServices()
    this.registerListener()
  }
  initServices() {
    const tableTabPanelService = new TableTabPanelService()
    tableTabPanelService.init({
      container: this.props.container
    }, this.context)
    this.tableNodePanel = new TableNodePanel()
    this.tableNodePanel.init({
      container: tableTabPanelService.getContainer('node')
    }, this.context)
    this.tableEdgePanel = new TableEdgePanel()
    this.tableEdgePanel.init({
      container: tableTabPanelService.getContainer('edge')
    }, this.context)
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
    this.tableNodePanel.update(nodeDatas)
  }
  setEdgeData(edgeDatas) {
    this.tableEdgePanel.update(edgeDatas)
  }
  dispose() {
    dispose(this._toDispose)
    this._toDispose = []
  }
  onTap(event) {
    console.log(event)
  }
}