import $ from 'jquery'
import _ from 'lodash'
import BootstrapDialog from 'bootstrap-dialog'
import FileResolver from './fileResolver'

/**
 * 文件导入类 
 */
export default class FileImporter {

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
/**
 * 文件导入的视图模型类
 */
class ViewModel {
  constructor() {
    this._filterFirstLine = true
    this._type = 'name'
    this._source = 'source'
    this._target = 'target'
    this._relation = 'relation'
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
  get source() {
    return this._source
  }
  set source(value) {
    this._source = value
  }
  get target() {
    return this._target
  }
  set target(value) {
    this._target = value
  }
  get type() {
    return this._type
  }
  set type(value) {
    this._type = value
    this._filterFirstLine = true
    this.view.update()
  }
  get relation() {
    return this._relation
  }
  set relation(value) {
    this._relation = value
  }
  get file() {
    return this._file
  }
  set file(value) {
    this._file = value
  }
  get filterFirstLine() {
    return this._filterFirstLine
  }
  set filterFirstLine(value) {
    this._filterFirstLine = value
  }
  ready() {
    this.view.ready()
  }
  validate() {
    if (!(this._source && this._target && this._relation && this._file)) {
      this._message = '数据不完整!'
      return false
    }
    try {
      if (this._type === 'seq') {
        parseInt(this._source)
        parseInt(this._target)
        parseInt(this._relation)
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
    $content.find('.fn-source').val(this.viewModel.source).end()
      .find('.fn-target').val(this.viewModel.target).end()
      .find('.fn-relation').val(this.viewModel.relation).end()
      .find('.fn-type').each((index, item) => {
        item.checked = item.value === this.viewModel.type
      }).end().
      find('.fn-filter-first-line').prop('checked', this.viewModel.filterFirstLine).end()
    if (this.viewModel.filterFirstLineDisplay) {
      $content.find('.fn-filter-first-line-wrap').hide()
    } else {
      $content.find('.fn-filter-first-line-wrap').show()
    }
  }
  bindEvent() {
    const $content = this.$content
    $content.find('.fn-source').change((event) => {
      this.viewModel.source = event.target.value
    }).end().find('.fn-target').change((event) => {
      this.viewModel.target = event.target.value
    }).end().find('.fn-relation').change((event) => {
      this.viewModel.relation = event.target.value
    }).end().find('.fn-type').change((event) => {
      this.viewModel.type = event.target.value
    }).end().find('.fn-filter-first-line').change((event) => {
      this.viewModel.filterFirstLine = event.target.value
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
              source: this.viewModel.source,
              target: this.viewModel.target,
              relation: this.viewModel.relation,
              type: this.viewModel.type,
              filterFirstLine: this.viewModel.filterFirstLine,
              file: this.viewModel.file
            }
            setTimeout(() => {
              new FileResolver().init({
                fileModel,
                callback: this.props.callback
              }, this.context)
            }, 0)
            dialog.close()
          } else {
            this.context.services.messageService.error(this.viewModel.message)
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
          <label class='control-label col-sm-3' for='source'>source</label>
          <div class='col-sm-7'>
            <input type='text' class='fn-source form-control' id='source' placeholder='source'/>
          </div>
        </div>
        <div class='form-group'>
          <label class='control-label col-sm-3' for='target'>target</label>
          <div class='col-sm-7'>
            <input type='text' class='fn-target form-control' id='target' placeholder='target'/>
          </div>
        </div>
        <div class='form-group'>
          <label class='control-label col-sm-3' for='relation'>relation</label>
          <div class='col-sm-7'>
            <input type='text' class='fn-relation form-control' id='relation' placeholder='relation'/>
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
        <div class='form-group fn-filter-first-line-wrap'>
          <div class='col-sm-3'></div>
          <div class='col-sm-7'>
            <label class="checkbox-inline">
              <input type='checkbox' class='fn-filter-first-line'/>首行非数据
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