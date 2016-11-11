import $ from 'jquery'
import _ from 'lodash'
import BootstrapDialog from 'bootstrap-dialog'
import PropertyResolver from './propertyResolver'

/**
 * 属性文件导入类
 * 数据导入后，只有连线，起始点和结束点，通过该类添加节点的属性
 */
export default class PropertyImporter {
  constructor() {

  }
  init(props, context) {
    this.props = props
    this.context = context
    const viewModel = new ViewModel()
    const view = new View()
    view.init({
      viewModel,
      callback: props.callback,
      container: props.container
    }, this.context)
    viewModel.init({
      view
    }, this.context)
    viewModel.ready()

  }
}
/**文件导入的视图模型类 */
class ViewModel {
  constructor() {

    this._type = 'name'
    this._id = 'source'
    this._file
    this._message = ''
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.view = props.view
  }
  get message() {
    return this._message
  }
  get filterFirstLineDisplay() {
    return this.type === 'name'
  }
  get id() {
    return this._id
  }
  set id(value) {
    this._id = value
  }
  get type() {
    return this._type
  }
  set type(value) {
    this._type = value
    this.view.update()
  }
  get file() {
    return this._file
  }
  set file(value) {
    this._file = value
  }

  ready() {
    this.view.ready()
  }
  validate() {
    if (!(this._id && this._file)) {
      this._message = '数据不完整!'
      return false
    }
    try {
      if (this._type === 'seq') {
        parseInt(this._id)
      }
    } catch (e) {
      this._message = '请填写正确的数据格式'
      return false
    }
    return true
  }
}
/**文件导入的视图类 */
class View {
  constructor() {
  }
  init(props, context) {
    this.props = props
    this.context = context
    this.viewModel = props.viewModel
  }
  ready() {
    this.$content = $(this.template)
    this.update()
    this.bindEvent()
    this.show()
  }
  update() {
    const $content = this.$content
    $content.find('.fn-id').val(this.viewModel.id).end()
      .find('.fn-type').each((index, item) => {
        item.checked = item.value === this.viewModel.type
      }).end()

  }
  bindEvent() {
    const $content = this.$content
    $content.find('.fn-id').change((event) => {
      this.viewModel.id = event.target.value
    }).end().find('.fn-type').change((event) => {
      this.viewModel.type = event.target.value
    }).end().find('.fn-file').change((event) => {
      this.viewModel.file = event.target.files[0]
    }).end()
    const $message = $('<div/>').appendTo($content)
    this.$message = $message
  }
  show() {
    const $content = this.$content
    BootstrapDialog.show({
      type: BootstrapDialog.TYPE_PRIMARY,
      // size: BootstrapDialog.SIZE_WIDE,
      title: '文件选择',
      message: $content,
      buttons: [{
        label: '&nbsp;确定',
        icon: 'glyphicon glyphicon-ok',
        cssClass: 'btn-primary',
        action: (dialog) => {
          if (this.viewModel.validate()) {
            const fileModel = {
              id: this.viewModel.id,
              type: this.viewModel.type,
              file: this.viewModel.file
            }
            setTimeout(() => {
              new PropertyResolver().init({
                fileModel,
                callback: this.props.callback
              }, this.context)
            }, 0)
            dialog.close()
          } else {
            this.context.controls.messageControl.error(this.viewModel.message)
          }
        }
      }, {
        label: '&nbsp;取消',
        icon: 'glyphicon glyphicon-remove',
        action: (dialog) => {
          dialog.close()
        }
      }]
    })
  }
  get template() {
    return `<div class=''>
      <form class='form-horizontal' role='form'>
        <div class='form-group'>
          <label class='control-label col-sm-3' for='property-import-id'>主键</label>
          <div class='col-sm-7'>
            <input type='text' class='fn-id form-control' id='property-import-id' placeholder='id'/>
          </div>
        </div>
        <div class='form-group'>
          <div class='col-sm-3'></div>
          <div class='col-sm-7'>
            <label class="radio-inline">
              <input type="radio" class='fn-type' name="type" value="name"/> 使用列名
            </label>
            <label class="radio-inline">
              <input type="radio" class='fn-type' name="type" value="seq"/> 使用列号(第0列开始)
            </label>
          </div>
        </div>
        <div class='form-group'>
          <div class='col-sm-3'></div>
          <div class='col-sm-7'>
            <input type='file' class='fn-file'/>
          </div>
        </div>
      </form>
    </div>`
  }
}