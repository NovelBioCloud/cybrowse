
import $ from 'jquery'
import { saveAs } from 'file-saver'
import EventMitter from 'events'
import Cytoscape from '../../platform/viewPanel/cytoscape'
import { dispose } from '../../base/lifecycle'
import CommandControl from '../command/commandControl'
import KeybindingControl from '../keybinding/keybindingControl'
import { SaveMenuCommand, ViewPanelCommand } from '../../platform/command/commands'
import cytoscapeEvents from '../../platform/constants/cytoscapeEvents'
import ViewPanel from '../../platform//viewPanel/viewPanel'

/**
 * cytoscape 视图服务 
 * 前台现实cytoscape的图像面板，在中部显示
 */
export default class ViewPanelControl extends EventMitter {
  constructor() {
    super()
    this._toDispose = []
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.controls = this.context.controls
  }
  ready() {
    this.render()
    this.initControls()
    this.registerListener()
  }
  initControls() {
    this.controls = this.context.controls
  }
  render() {
    if (!this.viewPanel) {
      this.viewPanel = new ViewPanel()
      this.viewPanel.init({
        container: this.getViewPanelContainer()
      }, this.context)
      const currentStyleControl = this.context.controls.currentStyleControl
      const currentLayoutControl = this.context.controls.currentLayoutControl
      this.viewPanel.setElements([])
      this.viewPanel.setStyles(currentStyleControl.getStyle())
      this.viewPanel.setLayout(currentLayoutControl.getLayout())
    }
  }

  remove() {
    if (this.viewPanel) {
      dispose(this._toDispose)
      this.viewPanel.dispose()
      this.viewPanel == null
    }
  }
  dispose() {
    this.remove()
  }
  getViewPanelContainer() {
    if (!this.viewPanelContainer) {
      this.viewPanelContainer = $('<div/>').appendTo($(this.props.container)).get(0)
    }
    return this.viewPanelContainer
  }

  /**
   * 注册当前数据和样式、布局变动事件
   */
  registerListener() {
    /**
     * 注册cytoscape的各种事件
     */
    Object.keys(cytoscapeEvents).forEach((eventName) => {
      this._toDispose.push((() => {
        let callback = (event) => {
          this.emit(eventName, event)
        }
        this.viewPanel.on(eventName, callback)
        return {
          toDispose: () => {
            this.viewPanel.off(eventName, callback)
          }
        }
      })())
    })

    const viewPanelControl = this.controls.viewPanelControl
    const currentDataControl = this.controls.currentDataControl
    const currentStyleControl = this.controls.currentStyleControl
    const currentLayoutControl = this.controls.currentLayoutControl
    const tableDatasourceControl = this.controls.tableDatasourceControl
    this._toDispose.push(currentDataControl.onChange(() => {
      viewPanelControl.updateData()
    }))
    this._toDispose.push(currentStyleControl.onChange(() => {
      viewPanelControl.updateStyle()
    }))
    this._toDispose.push(currentLayoutControl.onChange(() => {
      viewPanelControl.updateLayout()
    }))
  }
  /** 更新 cytoscape 视图 */
  update() {
    const currentDataControl = this.context.controls.currentDataControl
    const currentStyleControl = this.context.controls.currentStyleControl
    this.viewPanel.setElements(currentDataControl.getData())
    this.viewPanel.setStyles(currentStyleControl.getStyle())
  }
  /** 更新数据 */
  updateData() {
    const currentDataControl = this.context.controls.currentDataControl
    this.viewPanel.setElements(currentDataControl.getData())
  }
  /** 更新样式 */
  updateStyle() {
    const currentStyleControl = this.context.controls.currentStyleControl
    this.viewPanel.setStyles(currentStyleControl.getStyle())
  }
  /** 更新布局 */
  updateLayout() {
    const currentLayoutControl = this.context.controls.currentLayoutControl
    this.viewPanel.setLayout(currentLayoutControl.getLayout())
  }
  /** 更新属性值 */
  updateProperty(datas, idName) {
    this.viewPanel.updateProperty(datas, idName)
  }
}