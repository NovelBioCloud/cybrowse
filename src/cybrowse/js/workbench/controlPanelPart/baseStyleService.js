import BaseStyle from '../../platform/controlPanelPart/baseStyle'
import Emitter from '../../base/emitter/emitter'
import {StyleDetail} from '../../base/cytoscape/styles'
import _ from 'lodash'

/**
 * 样式服务
 */
export default class BaseStyleService {

  init(props, context) {
    this.props = props
    this.context = context
    const currentBaseStyleService = this.context.services.currentBaseStyleService
    const baseStyle = new BaseStyle()
    baseStyle.init({
      container: props.container,
      entries: currentBaseStyleService.getStyleEntries()
    }, {
      onChange: (value) => {
        currentBaseStyleService.changeStyle(value)
      }
    })
  }

}