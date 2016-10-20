import $ from 'jquery'
let $colorSelector
export default class ColorSelector {
  constructor({
    defaultValue,
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
ColorSelector.show = (options) => {
  new ColorSelector(options)
}