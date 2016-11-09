import { dispose } from '../../base/lifecycle'
import TableNodePanel from './tableNodePanel'
import TableEdgePanel from './tableEdgePanel'
import TableTabPanel from './tableTabPanel'

/** table面板 */
export default class TablePane {

  init(props, context) {
    this.props = props
    this.context = context
    this.services = this.context.services
    /** 创建一个 tab */
    const tableTabPanel = new TableTabPanel()
    tableTabPanel.init({
      container: this.props.container
    }, this.context)
    /** 创建一个 node */
    this.tableNodePanel = new TableNodePanel()
    this.tableNodePanel.init({
      container: tableTabPanel.getContainer('node')
    }, this.context)
    /** 创建一个 edge */
    this.tableEdgePanel = new TableEdgePanel()
    this.tableEdgePanel.init({
      container: tableTabPanel.getContainer('edge')
    }, this.context)
 
  }
  /** 设置节点数据 */
  setNodeData(nodeDatas) {
    this.tableNodePanel.update(nodeDatas)
  }
  /** 设置连线数据 */
  setEdgeData(edgeDatas) {
    this.tableEdgePanel.update(edgeDatas)
  }

}