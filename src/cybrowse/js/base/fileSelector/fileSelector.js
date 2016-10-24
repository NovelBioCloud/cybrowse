import $ from 'jquery'

/**全局的文件选择对象 */
let $fileSelector
/**文件选择类 */
export default class FileSelector {
  constructor({
    accept,
    multiple,
    onChange
  }) {
    $fileSelector && $fileSelector.remove()
    $fileSelector = $(`<div style='width:0px;height:0px;overflow:hidden'/>`).appendTo(document.body)
    const $input = $(`<input type='file'/>`).appendTo($fileSelector)
    accept && $input.attr({
      accept: accept
    })
    multiple && $input.attr({
      multiple: 'multiple'
    })
    $input.change(
      function (e) {
        onChange && onChange(e.target.files)
        $(this).remove()
      })
    setTimeout(() => {
      $input.click()
    }, 100)
  }
}
FileSelector.show = (options) => {
  new FileSelector(options)
}