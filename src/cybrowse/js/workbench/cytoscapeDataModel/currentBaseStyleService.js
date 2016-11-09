import CytoscapeBaseStyle from '../../platform/cytoscapeDataModel/cytoscapeBaseStyle'
import Emitter from '../../base/emitter'
import _ from 'lodash'

/**
 * 样式服务 
 */
export default class CurrentBaseStyleService {

  constructor() {
    this._onChange = new Emitter()
    this.cytoscapeBaseStyle = new CytoscapeBaseStyle()
  }

  get onChange() {
    return this._onChange.event
  }

  init(props, context) {
    this.props = props
    this.context = context
  }
  
  /**
   * 修改样式并触发事件
   */
  changeStyle(styleId) {
    this.cytoscapeBaseStyle.changeStyle(styleId)
    this._onChange.emit(styleId)
  }
  
  getStyle(styleName) {
    return this.cytoscapeBaseStyle.getStyle(styleName)
  }
  removeStyle(styleId) {
    return this.cytoscapeBaseStyle.removeStyle(styleId)
  }
  addStyle(style) {
    return this.cytoscapeBaseStyle.addStyle(style)
  }
  renameStyle(styleName) {

  }
  
  copyStyle() {

  }

  makeCurrentDefault() {

  }

  getStyleEntries() {
    return this.cytoscapeBaseStyle.getStyleEntries()
  }

}