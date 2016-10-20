import $ from 'jquery'

import TabPanel from '../../platform/tabPanel/tabPanel'

const TabPanelServicePanel = {
  node: 'node',
  edge: 'edge',
  other: 'other'
}

export default class TabPanelService {
  constructor() {

  }
  init(props, context) {
    this._panels = new Map()
    this.container = props.container
    this.tabPanel = new TabPanel()
    const panelEntries = [{
      id: 'tab-node',
      name: 'node',
      callback: (container) => {
        this._panels.set(TabPanelServicePanel.node, container)
      }
    },
    {
      id: 'tab-edge',
      name: 'edge',
      callback: (container) => {
        this._panels.set(TabPanelServicePanel.edge, container)
      }
    }]
    this.tabPanel.init({
      entries: panelEntries,
      container: props.container,
    })
  }
  getContainer(panelName) {
    return this._panels.get(panelName)
  }

}