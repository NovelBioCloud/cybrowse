import $ from 'jquery'

import TabPanel from '../../platform/tabPanel/tabPanel'

const TableTabPanelServicePanel = {
  node: 'node',
  edge: 'edge'
}
/**table 的布局服务 */
export default class TableTabPanelService {
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
        this._panels.set(TableTabPanelServicePanel.node, container)
        $(container).css({
          'height': '150px',
          'overflow': 'auto'
        })
      }
    }, {
        id: 'table-tab-edge',
        name: 'edge',
        callback: (container) => {
          this._panels.set(TableTabPanelServicePanel.edge, container)
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