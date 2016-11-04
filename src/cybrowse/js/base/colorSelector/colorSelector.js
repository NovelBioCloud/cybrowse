import $ from 'jquery'

/**
 * 颜色选择服务，颜色选择框只有一个实例
 */
class ColorSelectorService {
  /**
   * 构造方法
   */
  constructor() {
    this._instance
  }
  /**
   * 显示颜色选择
   * @param options 参考 ColorSelector 的构造函数
   */
  show(options) {
    new ColorSelector(options)
  }

  /**销毁单例 */
  dispose() {
    if (this._instance) {
      this._instance.dispose()
      this._instance = null
    }
  }
  /**
   * 设在全局实例
   * @param value 新的ColorSelector对象
   */
  set instance(value) {
    this.dispose()
    if (value) {
      this._instance = value
    }
  }
}
/**
 * 颜色选择服务实例
 */
const colorSelectorService = new ColorSelectorService()

/**
 * 颜色选择工具，用于手动弹出颜色选择框
 * 用于cytoscape的连线颜色和节点背景颜色等
 */
export default class ColorSelector {
  /**
   * 构造方法
   */
  constructor({
    /**默认值 */
    defaultValue,
    /**回调函数，参数是选择的颜色 */
    onChange
  }) {
    this._registerSingleton()
    const $colorSelector = $(`<div style='width:0px;height:0px;overflow:hidden'></div>`).appendTo(document.body)
    this.$colorSelector = $colorSelector
    const $input = $(`<input type='color' value='${defaultValue}' style=''/>`).appendTo($colorSelector)
    $input.change(
      (e) => {
        onChange && onChange(e.target.value)
        this._unregisterSingleton()
      })
    setTimeout(() => {
      $input.get(0).click()
    }, 100)
  }
  /**
   * 析构方法
   */
  dispose() {
    this.$colorSelector.remove()
  }

  /**
   * 注册单例
   */
  _registerSingleton() {
    colorSelectorService.instance = this
  }
  /**
   * 注销单例
   */
  _unregisterSingleton() {
    colorSelectorService.instance = null
  }
}
/**辅助方法,建议通过该方法显示颜色选择框 */
ColorSelector.show = (options) => {
  colorSelectorService.show(options)
}
