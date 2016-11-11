import $ from 'jquery'
import _ from 'lodash'
import EventEmitter from 'events'
import Color from 'color'
import { EdgeStyleName, EdgeStyleModel } from '../../../../base/cytoscape/styles'
import DataModel from '../../../../base/cytoscape/datas'
import DefaultValue from './defaultValue'
import Mapping from './mapping'
import Bypass from './bypass'

/**
 * lineColor 连线颜色设置面板
 */
export default class LineColor {

  /**
   * 手动初始化方法
   * @param props 参数设置
   * @param context 上下文环境
   */
  init(props, context) {
    this.props = props
    this.context = context
    this.render()
  }
  /**渲染视图的方法 */
  render() {
    const props = this.props
    const context = this.context
    $(this.props.container).empty()
    const view = new View()
    view.init({
      container: this.props.container
    })
    const currentStyleControl = this.context.controls.currentStyleControl
    const viewPanelControl = this.context.controls.viewPanelControl
    /** 当前样式操作模型类 */
    const styleModel = new EdgeStyleModel(EdgeStyleName.lineColor, currentStyleControl)
    /** 当前数据模型类 */
    const dataModel = new DataModel(currentStyleControl)

    /**
     * 默认值
     */
    const defaultValue = new DefaultValue()
    this.defaultValue = defaultValue
    defaultValue.init({
      styleModel: styleModel,
      dataModel: dataModel,
      valueType: '',
      container: view.getContainer('defaultValue'),
      callbacks: {
        onChange: (value) => {
          styleModel.setDefaultValue(value)
          viewPanelControl.update()
        },
        onRemove: () => {
          styleModel.removeDefaultValue()
          viewPanelControl.update()
        },
        onReset: () => {
          styleModel.setDefaultValue("#FF0000")
          viewPanelControl.update()
        }
      }
    }, context)

    /**
     * 匹配
     */
    const mapping = new Mapping()
    this.mapping = mapping
    mapping.init({
      styleModel: styleModel,
      dataModel: dataModel,
      valueType: '',
      /** 小图标 */
      mappingContainer: view.getContainer('mappingContainer'),
      /** 内容 */
      contentContainer: view.getContainer('contentContainer')
    }, context)

    /**直接设置 */
    const bypass = new Bypass()
    this.bypass = bypass
    bypass.init({
      styleModel: styleModel,
      dataModel: dataModel,
      container: view.getContainer('bypass')
    }, context)
  }
  update() {
    this.defaultValue.update()
    this.mapping.update()
    this.bypass.update()
  }
}
/**
 * LineColor 对应的视图
 */
class View {
  init(props, context) {
    this._panels = new Map()
    const $layout = $(this.template).appendTo($(props.container))
    const $defaultValue = $layout.find('.fn-default')
    const $mappingContainer = $layout.find('.fn-mapping')
    const $bypass = $layout.find('.fn-bypass')
    const $contentContainer = $layout.find('.fn-content')
    this._panels.set('defaultValue', $defaultValue.get(0))
    this._panels.set('mappingContainer', $mappingContainer.get(0))
    this._panels.set('bypass', $bypass.get(0))
    this._panels.set('contentContainer', $contentContainer.get(0))
  }
  getContainer(name) {
    return this._panels.get(name)
  }
  get template() {
    return `
      <div class='panel panel-default'>
        <ul class="list-group">
          <li class="list-group-item">
            <div style='display:flex'>
              <div class='' style='width:80px'>
                <div style='line-height:30px'><label>连线颜色</label></div>
              </div>
              <div class='fn-default' style='width:120px'></div>
              <div class='fn-mapping' style='width:70px'></div>
              <div class='fn-bypass' style='width:70px'></div>
            </div>
          </li>
          <li class="fn-content list-group-item">
          </li>
        </ul>
      </div>`
  }
}



