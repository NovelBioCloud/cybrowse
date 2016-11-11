import BaseStyle from '../../platform/controlPanelPart/baseStyle'
import Emitter from '../../base/emitter'
import {StyleDetail} from '../../base/cytoscape/styles'
import _ from 'lodash'

/**
 * 样式服务，修改基础的功能，通过该服务实现,
 * 左侧的 style 下拉框组件
 * 根据currentBaseStyleControl的数据绘制数据
 */
export default class BaseStyleControl {

  init(props, context) {
    this.props = props
    this.context = context
    const currentBaseStyleControl = this.context.controls.currentBaseStyleControl
    const baseStyle = new BaseStyle()
    baseStyle.init({
      container: props.container,
      entries: currentBaseStyleControl.getStyleEntries(),
      onChange: (value) => {
        currentBaseStyleControl.changeStyle(value)
      }
    }, context)
  }

}