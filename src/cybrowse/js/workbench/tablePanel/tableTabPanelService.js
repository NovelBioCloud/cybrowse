import $ from 'jquery'

import TabPanel from '../../platform/tabPanel/tabPanel'

const TableTabPanelServicePanel = {
  node: 'node',
  edge: 'edge',
  other: 'other'
}

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
      }
    }, {
      id: 'table-tab-edge',
      name: 'edge',
      callback: (container) => {
        this._panels.set(TableTabPanelServicePanel.edge, container)
      }
    }, {
      id: 'table-tab-other',
      name: 'other',
      callback: (container) => {
        this._panels.set(TableTabPanelServicePanel.other, container)
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