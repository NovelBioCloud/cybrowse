
import Emitter from '../../base/emitter/emitter'
import { StyleDetail } from '../../base/cytoscape/styles'
import _ from 'lodash'

/**
 * 样式服务 
 */
export default class CytoscapeBaseStyle {

  constructor() {
    this.activeEntryId = 'default'
    this.initStyleEntries()
  }


  init(props, context) {
    this.props = props
    this.context = context
  }
  changeStyle(styleId) {
    this.activeEntryId = styleId
  }
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
      new StyleDetail(style).build()
      return style
    })
  }
  getStyle(styleName) {
    styleName = styleName || this.activeEntryId
    return this.styleEntries.find((item) => {
      return item.id === styleName
    })
  }
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
  getStyleEntries() {
    return this.styleEntries
  }
  renameStyle(styleName) {

  }
  copyStyle() {

  }
  makeCurrentDefault() {

  }

}