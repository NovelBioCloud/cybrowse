import $ from 'jquery'
import _ from 'lodash'
import Color from 'color'
import lifecycle from '../../../../base/lifecycle/lifecycle'
let bypassInstance
/**
 * id直接传值
 */
export default class Bypass {
  constructor() {
    this._toDispose = []
  }
  init(props, context) {
    if (bypassInstance) {
      bypassInstance.dispose()
    }
    bypassInstance = this
    this.props = props
    this.context = context
    this._styleModel = props.styleModel
    this._dataModel = props.dataModel
    const bypassViewModel = new BypassViewModel()
    const bypassView = new BypassView()
    bypassView.init({
      container: props.container,
      bypassViewModel,
    }, context)
    bypassViewModel.init({
      bypassView,
      styleModel: props.styleModel,
      dataModel: props.dataModel
    }, context)
    bypassViewModel.ready()
    this.bypassViewModel = bypassViewModel
    const viewPanelService = this.context.services.viewPanelService
    const eventName = 'tap'
    const listener = (event) => {
      try {
        if (event.cyTarget && event.cyTarget[0] && event.cyTarget[0].isNode && event.cyTarget[0].isNode()) {
          const id = event.cyTarget[0].data('id')
          bypassViewModel.id = id
        } else {
          bypassViewModel.id = null
        }
      } catch (e) {
        bypassViewModel.id = null
      }
    }
    viewPanelService.on(eventName, listener)
    this._toDispose.push({
      dispose: () => {
        viewPanelService.removeListener(eventName, listener)
      }
    })
  }
  update() {
    this.bypassViewModel.update()
  }
  dispose() {
    lifecycle.dispose(this._toDispose)
    this._toDispose = []
  }
}
/**
 * id直接传值视图模型类
 */
class BypassViewModel {
  constructor() {
    this._bypassView = null
    this._styleValue = null
    this._id
  }
  init(props, context) {
    this.props = props
    this.context = context
    this._bypassView = props.bypassView
    this._styleModel = props.styleModel
    this._dataModel = props.dataModel
  }
  ready() {
    this._bypassView.ready()
  }
  update() {
    this._bypassView.update()
  }
  get id() {
    return this._id
  }
  set id(value) {
    this._id = value
    this._updateStyleValue()
    this._bypassView.update()
  }
  _updateStyleValue() {
    if (this._id) {
      this._styleValue = this._styleModel.getBypass(this._id)
    } else {
      this._styleValue = ''
    }
  }
  get styleValue() {
    this._updateStyleValue()
    return this._styleValue
  }
  set styleValue(styleValue) {
    if (this._id) {
      this._styleValue = styleValue
      if (styleValue) {
        this._styleModel.setBypass(this._id, styleValue)
      } else {
        this._styleModel.removeBypass(this._id)
      }
      this.context.services.viewPanelService.update()
    }
    this._bypassView.update()
  }
}
/**
 * id直接传值视图
 */
class BypassView {
  constructor() {
    this._bypassViewModel
  }
  init(props, context) {
    this.props = props
    this.context = context
    this._bypassViewModel = props.bypassViewModel
    this.$container = $(props.container)
  }
  ready() {
    this.render()
  }
  render() {
    this.update()
  }
  update() {
    this.$container.empty()
    new ColorComponent().init({
      container: $('<div/>').css('text-align', 'center').appendTo(this.props.container).get(0),
      styleValue: this._bypassViewModel.styleValue,
      id: this._bypassViewModel.id,
      onChange: (event) => {
        this._bypassViewModel.styleValue = event.target.value
      },
      onRemove: (event) => {
        this._bypassViewModel.styleValue = null
      },
    })

  }
}
/**
 * 颜色选择组件
 */
class ColorComponent {
  init({
    container,
    onChange,
    onRemove,
    styleValue,
    id
  }) {
    const $container = $(container)
    const $el = $('<div/>').css('line-height', '30px').appendTo($container)
    if (id) {
      if (styleValue) {
        const inputValue = new Color(styleValue).hexString()
        const $input = $(`<input type='color' value='${inputValue}' class='ac-pointer'/> `).appendTo($el)
        $input.change((event) => {
          onChange && onChange(event)
        })

        const $remove = $(`<i class='fa fa-times fa-fw fa-lg ac-pointer'></i>`).appendTo($el)
        $remove.click((e) => {
          onRemove && onRemove(event)
        })

      } else {
        const $input = $(`<input type='color' value='#E0E0E0' style='border-color: transparent;' class='ac-pointer'/> `).appendTo($el)
        $input.change((event) => {
          onChange && onChange(event)
        })
      }
    }
  }
}