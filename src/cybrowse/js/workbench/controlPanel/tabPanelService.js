import $ from 'jquery'

import TabPanel from '../../platform/tabPanel/tabPanel'

/**
 * 切换面板中的特殊面板名
 */
const TabPanelServicePanel = {
  node: 'node',
  edge: 'edge',
  other: 'other'
}
/**
 * 切换面板服务
 */
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
  /**
   * 外部通过panelName获取面板对象
   */
  getContainer(panelName) {
    return this._panels.get(panelName)
  }

}