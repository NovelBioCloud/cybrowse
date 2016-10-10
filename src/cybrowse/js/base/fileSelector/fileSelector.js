import $ from 'jquery'
let $fileSelector
export default class FileSelector {
  constructor({
    accept,
    multiple,
    onChange
  }) {
    $fileSelector && $fileSelector.remove()
    $fileSelector = $(`<input type='file'/>`).hide().appendTo(document.body)
    accept && $fileSelector.attr({
      accept: accept
    })
    multiple && $fileSelector.attr({
      multiple: 'multiple'
    })
    $fileSelector.change(
      function (e) {
        onChange && onChange(e.target.files)
        $(this).remove()
      })
    $fileSelector.click()
  }
}
FileSelector.show = (options) => {
  new FileSelector(options)
}