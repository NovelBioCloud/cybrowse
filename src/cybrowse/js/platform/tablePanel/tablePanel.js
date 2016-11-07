import { dispose } from '../../base/lifecycle/lifecycle'
import TableNodePanel from './tableNodePanel'
import TableEdgePanel from './tableEdgePanel'
import TableTabPanel from './tableTabPanel'

/** table面板服务 */
export default class TablePane {

  init(props, context) {
    this.props = props
    this.context = context
    this.services = this.context.services
    const tableTabPanel = new TableTabPanel()
    tableTabPanel.init({
      container: this.props.container
    }, this.context)
    this.tableNodePanel = new TableNodePanel()
    this.tableNodePanel.init({
      container: tableTabPanel.getContainer('node')
    }, this.context)
    this.tableEdgePanel = new TableEdgePanel()
    this.tableEdgePanel.init({
      container: tableTabPanel.getContainer('edge')
    }, this.context)
 
  }

  setNodeData(nodeDatas) {
    this.tableNodePanel.update(nodeDatas)
  }
  setEdgeData(edgeDatas) {
    this.tableEdgePanel.update(edgeDatas)
  }

}