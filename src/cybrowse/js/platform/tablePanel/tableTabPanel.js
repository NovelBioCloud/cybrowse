import $ from 'jquery'

import TabPanel from '../../platform/tabPanel/tabPanel'

/**
 * 表格面板中的特殊面板
 */
const TableTabPanelContainer = {
  node: 'node',
  edge: 'edge'
}
/**table 的布局 */
export default class TableTabPanel {
  constructor() {
  }
  init(props, context) {
    this._panels = new Map()
    this.container = props.container
    this.tabPanel = new TabPanel()
    const panelEntries = [{
      id: 'table-tab-node',
      name: 'node',
      callback: (container) => {
        this._panels.set(TableTabPanelContainer.node, container)
        $(container).css({
          'height': '150px',
          'overflow': 'auto'
        })
      }
    }, {
        id: 'table-tab-edge',
        name: 'edge',
        callback: (container) => {
          this._panels.set(TableTabPanelContainer.edge, container)
          $(container).css({
            'height': '150px',
            'overflow': 'auto'
          })
        }
      }]
    this.tabPanel.init({
      entries: panelEntries,
      container: props.container,
    }, context)
  }
  getContainer(panelName) {
    return this._panels.get(panelName)
  }

}