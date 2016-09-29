import _ from 'lodash'
import $ from 'jquery'

export default function ColorEditor() {
  let _this = this,
    props, container, view, value, onChange
  this.init = init

  function init(props) {
    data_init(props)
    view_paint()
  }

  function changeValue(value) {
    value = value
    onChange(value)
  }

  function data_init(_props) {
    props = _props
    container = props.container
    value = props.value
    onChange = props.onChange
  }

  function view_paint() {
    view = ColorEditorView.newInstance()
    view.mount({
      container: container,
      onChange: changeValue.bind(this),
      value: value,
    })
  }

}
ColorEditor.newInstance = function () {
  return new ColorEditor()
}

function ColorEditorView() {
  this.mount = mount
  this.unmount = unmount

  let _this = this,
    view, onChange, value, container

  function mount(props) {
    container = props.container
    value = props.value
    onChange = props.onChange
    view = value ? createCustomValueView() : createDefaultValueView()
    view.appendTo(container)
  }

  function changeValue(value) {
    onChange && onChange(value)
  }

  function unmount() {
    view.remove()
  }

  function createDefaultValueView() {

    let templateString1 = `
      <div>
        <button type='button' class='fn-edit-color btn btn-sm btn-default'>
          <i class='fa fa-fw fa-edit'/>
        </button>
        <input type='color' class='invisible'/>
      </div>`
    let template = _.template(templateString1)
    let view = $(template())
    view.find('.fn-edit-color').click(() => {
      view.find('input').trigger('click')
    })
    view.find('input').change((event)=>{
      changeValue(event.target.value)
    })
    return view
  }

  function createCustomValueView() {
    let templateString2 = `
      <div>
        <input type='color'/>
        <button type='button' class='fn-remove-color btn btn-sm btn-default'>
          <i class='fa fa-fw fa-trash'/>
        </button>
      </div>`
    let template = _.template(templateString2)
    let view = $(template())
    view.find('input').val(value)
    view.find('input').change((event) => {
      changeValue(event.target.value)
    })
    view.find('.fn-remove-color').click(() => {
      changeValue('')
    })
    return view
  }
}
ColorEditorView.newInstance = function () {
  return new ColorEditorView()
}