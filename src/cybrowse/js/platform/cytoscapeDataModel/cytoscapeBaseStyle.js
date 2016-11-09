
import Emitter from '../../base/emitter'
import { StyleDetail } from '../../base/cytoscape/styles'
import _ from 'lodash'

/**
 * 基本样式数据模型
 * @see currentBaseStyleService
 */
export default class CytoscapeBaseStyle {

  constructor() {
    /** 默认激活的样式数据id */
    this.activeEntryId = 'default'
    this.initStyleEntries()
  }
  init(props, context) {
    this.props = props
    this.context = context
  }
  /**
   * 修改激活的样式数据
   */
  changeStyle(styleId) {
    this.activeEntryId = styleId
  }
  /**
   * 默认样式数据
   */
  initStyleEntries() {
    this.styleEntries = _.map([
      {
        id: 'default',
        name: 'default',
        title: 'default',
        style: [{
          "selector": "node",
          "style": {
            "border-color": "rgb(204,204,204)",
            "font-family": "SansSerif.plain",
            "font-weight": "normal",
            "font-size": 12,
            "background-color": "rgb(137,208,245)",
            "border-opacity": 1.0,
            "height": 35.0,
            "text-opacity": 1.0,
            "text-valign": "center",
            "text-halign": "center",
            "border-width": 0.0,
            "width": 75.0,
            "background-opacity": 1.0,
            "color": "rgb(0,0,0)",
            "shape": "roundrectangle",
            "content": "data(id)"
          }
        }]
      },
      {
        id: 'name1',
        name: 'name1',
        title: 'name1',
        style: [{
          "selector": "node",
          "style": {
            "border-color": "#EEEEEE",
            "font-family": "SansSerif.plain",
            "font-weight": "normal",
            "font-size": 12,
            "background-color": "rgb(137,208,245)",
            "border-opacity": 1.0,
            "height": 35.0,
            "text-opacity": 1.0,
            "text-valign": "center",
            "text-halign": "center",
            "border-width": 0.0,
            "width": 75.0,
            "background-opacity": 1.0,
            "color": "rgb(0,0,0)",
            "shape": "roundrectangle",
            "content": "data(id)"
          }
        }]
      }
    ], (style) => {
      /** 对样式数据进行解析，返回格式化以后的样式数据 */
      new StyleDetail(style).build()
      return style
    })
  }
  /**
   * 根据样式id获取样式数据
   */
  getStyle(styleId) {
    styleId = styleId || this.activeEntryId
    return this.styleEntries.find((item) => {
      return item.id === styleId
    })
  }
  /** 删除样式styleId */
  removeStyle(styleId) {
    if (styleId === 'default') {
      return
    } else {
      let toRemoveId = styleId
      if (styleId === this.activeEntryId) {
        this.changeStyle('default')
      } else {
        const temp = _.find(this.styleEntries, (style) => {
          return _style.id === styleId
        })
        if (!temp) {
          toRemoveId = null
        }
      }
      if (toRemoveId) {
        _.remove(this.styleEntries, (style) => {
          return style.id === toRemoveId
        })
      }
    }
  }
  /** 添加样式 */
  addStyle(style) {
    const temp = _.find(this.styleEntries, (style) => {
      return _style.id === style.id
    })
    if (temp) {
      return
    }
    new StyleDetail(style).build()
    this.styleEntries.push(style)
  }
  /** 获取样式数据 */
  getStyleEntries() {
    return this.styleEntries
  }

}