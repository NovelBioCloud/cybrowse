import $ from 'jquery'
import _ from 'lodash'
import EventEmitter from 'events'
import Color from 'color'
import { NodeStyleName, EdgeStyleName, NodeStyleModel, EdgeStyleModel } from '../../../../base/cytoscape/styles'
/**
 * 默认值修改类
 */
export default class DefaultValue {
  init(props, context) {
    this.props = props
    this.context = context
    this.render()
  }
  render() {
    this.update()
  }
  update() {
    const props = this.props
    const context = this.context
    $(props.container).empty()
    const callbacks = props.callbacks
    const styleModel = props.styleModel
    const styleValue = styleModel.getDefaultValue()
    const $colorContainer = $(`<div/>`).appendTo($(props.container))
    new ColorComponent().init({
      styleValue: styleValue,
      container: $colorContainer.get(0),
      onChange: (event) => {
        callbacks.onChange(event.target.value)
        this.render()
      },
      onRemove: (event) => {
        callbacks.onRemove()
        this.render()
      },
      onReset: (event) => {
        callbacks.onReset()
        this.render()
      }
    })
  }
}
/** 内部的颜色选择框组件 */
class ColorComponent {
  init({
    container,
    styleValue,
    onChange,
    onRemove,
    onReset
  }) {
    const $container = $(container)
    const $el = $('<div/>').css({
      'line-height': '30px'
    }).appendTo($container)
    if (styleValue) {
      const inputValue = new Color(styleValue).hexString()
      const $input = $(`<input type='color' value='${inputValue}' class='ac-pointer'/> `).appendTo($el)
      $input.change((event) => {
        onChange && onChange(event)
      })

      const $remove = $(`<i class='fa fa-times fa-fw fa-lg ac-pointer'></i>`).appendTo($el)
      $remove.click((e) => {
        onRemove && onRemove(e)
      })
      const $reset = $(`<i class='fa fa-undo fa-fw fa-lg ac-pointer'></i>`).appendTo($el)
      $reset.click((e) => {
        onReset && onReset(e)
      })
    } else {
      const $input = $(`<input type='color' value='#E0E0E0' style='border-color: transparent;' class='ac-pointer'/> `).appendTo($el)
      $input.change((event) => {
        onChange && onChange(event)
      })
    }
  }
}