import $ from 'jquery'

/**
 * 颜色选择工具，全局类
 */
let $colorSelector

/**
 * 颜色选择工具
 */
export default class ColorSelector {
  constructor({
    /**默认值 */
    defaultValue,
    /**回调函数，参数是选择的颜色 */
    onChange
  }) {
    $colorSelector && $colorSelector.remove()
    $colorSelector = $(`<div style='width:0px;height:0px;overflow:hidden'></div>`).appendTo(document.body)
    const $input = $(`<input type='color' value='${defaultValue}' style=''/>`).appendTo($colorSelector)
    $input.change(
      function (e) {
        onChange && onChange(e.target.value)
        console.log('change color')
        $(this).remove()
      })
    setTimeout(() => {
      $input.get(0).click()
    }, 100)
  }
}
/**
 * 颜色选择工具类
 */
ColorSelector.show = (options) => {
  new ColorSelector(options)
}