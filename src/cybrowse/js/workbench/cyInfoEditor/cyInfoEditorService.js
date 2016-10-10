import $ from 'jquery'
class CyInfoEditor {

  init(props, context, options) {
    this.container = props.container
    this.render()
  }
  render(){
    const $el=$('<div/>').appendTo($(this.container))
    this.el = $el.get(0)
    $(`<div/>`,{
      text:'test cyInfoEditor'
    }).appendTo($el)
  }
  dispose() {

  }
}

export default class CyInfoEditorService {
  init(props, context) {
    this.props = props
    this.context = context
    this.render()
  }
  render(force) {

    if (force) {
      this.remove()
    }
    if (!this.cyInfoEditor) {
      this.cyInfoEditor = new CyInfoEditor()
      this.cyInfoEditor.init({
        container: this.getCyInfoEditorContainer()
      }, this.context)
    }
  }
  remove() {
    if (this.cyInfoEditor) {
      this.cyInfoEditor.dispose()
      this.cyInfoEditor == null
    }
  }
  dispose() {
    this.remove()
  }
  getCyInfoEditorContainer() {
    if (!this.cyInfoEditorContainer) {
      this.cyInfoEditorContainer = $('<div/>', {
        class: 'cy-info-editor-service--cy-info-editor-container'
      }).appendTo($(this.props.container)).get(0)
    }
    return this.cyInfoEditorContainer
  }
}