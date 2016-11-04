import $ from 'jquery'

/**
 * 文件选择服务
 */
class FileSelectorService {
  constructor() {
    this._instance
  }
  set instance(value) {
    this.dispose()
    this._instance = value
  }
  dispose() {
    if (this._instance) {
      this._instance.dispose()
    }
  }
  show(options) {
    new FileSelector(options)
  }
}
const fileSelectorService = new FileSelectorService()
/**
 * 文件选择类 
 */
export default class FileSelector {
  /**
   * 构造方法
   * 
   * @param {
   *  accept,
   *  multiple,
   *  onChange
   * }
   */
  constructor({
    accept,
    multiple,
    onChange
  }) {
    this._registerInstance()
    const $fileSelector = $(`<div style='width:0px;height:0px;overflow:hidden'/>`).appendTo(document.body)
    this.$fileSelector = $fileSelector
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
        this._unregisterInstance()
      })
    setTimeout(() => {
      $input.click()
    }, 100)
  }
  dispose() {
    this.$fileSelector.remove()
  }
  _registerInstance() {
    fileSelectorService.instance = this
  }
  _unregisterInstance() {
    fileSelectorService.instance = null
  }
}
/**
 * 文件选择类工具方法 
 */
FileSelector.show = (options) => {
  fileSelectorService.show(options)
}