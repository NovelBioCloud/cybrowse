import $ from 'jquery'
import _ from 'lodash'
import Color from 'color'
import lifecycle from '../../../../base/lifecycle'

/**
 * id传值类
 */
export default class Bypass {
  constructor() {
    this._toDispose = []
  }
  init(props, context) {
    this.props = props
    this.context = context
    /** 样式数据模型 */
    this._styleModel = props.styleModel
    /** 节点连线数据模型 */
    this._dataModel = props.dataModel
    /** 视图模型 */
    const bypassViewModel = new BypassViewModel()
    /** 视图 */
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
    this.registerListener()
  }
  /** 注册 tap 事件 */
  registerListener() {
    const bypassViewModel = this.bypassViewModel
    const viewPanelService = this.context.services.viewPanelService
    const eventName = 'tap'
    const listener = (event) => {
      try {
        if (event.cyTarget && event.cyTarget[0] && event.cyTarget[0].isEdge && event.cyTarget[0].isEdge()) {
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
  /** 更新数据视图 */
  update() {
    this.bypassViewModel.update()
  }
  dispose() {
    lifecycle.dispose(this._toDispose)
    this._toDispose = []
  }
}
/**
 * Bypass 类中使用的ViewModel类
 */
class BypassViewModel {
  constructor() {
    // viewModel的视图类
    this._bypassView = null
    this._styleValue = null
    this._id//连线的id
  }
  init(props, context) {
    this.props = props
    this.context = context
    this._bypassView = props.bypassView
    /** 样式数据模型 */
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
  /** 内部方法，如果this.id为空，修正样式数据this._styleValue */
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
/** Bypass的视图类 */
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
    // 调用颜色选择框组件
    new ColorComponent().init({
      container: $('<div/>').css('text-align', 'center').appendTo(this.props.container).get(0),
      styleValue: this._bypassViewModel.styleValue,
      id: this._bypassViewModel.id,
      onChange: (event) => {
        // 修改数据模型的颜色值
        this._bypassViewModel.styleValue = event.target.value
      },
      onRemove: (event) => {
        // 修改数据模型的颜色值
        this._bypassViewModel.styleValue = null
      },
    })

  }
}
/** 内部颜色选择框组件 */
class ColorComponent {
  init({
    container,//渲染用的htmlElement
    onChange,//数据修改事件
    onRemove,//数据删除事件
    styleValue,//默认样式数据
    id//连线的id，如果id为空，说明当前页面没有选中的连线，不进行渲染
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