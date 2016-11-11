import $ from 'jquery'

import TabPanel from '../../platform/tabPanel/tabPanel'

/**
 * 控制面板中的特定面板名
 */
const ControlPanelContainer = {
  node: 'node',
  edge: 'edge',
  baseStyle: 'baseStyle',
  other: 'other'
}
/**
 * 控制面板，主要创建前台视图
 * 前台左侧的编辑面板，包括设置样式选择，节点和连线的数据编辑
 */
export default class ControlPanel {
  constructor() {

  }
  init(props, context) {
    this._panels = new Map()
    this.container = props.container
    this.tabPanel = new TabPanel()
    const $baseStyle = $('<div/>').appendTo($(props.container))
    this._panels.set(ControlPanelContainer.baseStyle, $baseStyle.get(0))
    const panelEntries = [{
      id: 'tab-node',
      name: 'node',
      callback: (container) => {
        this._panels.set(ControlPanelContainer.node, container)
      }
    },
    {
      id: 'tab-edge',
      name: 'edge',
      callback: (container) => {
        this._panels.set(ControlPanelContainer.edge, container)
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