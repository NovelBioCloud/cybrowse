import $ from 'jquery'
export const LayoutServiceContainer = {
  toolbar: 'toolbar',
  cyInfoEditor: 'cyInfoEditor',
  cyPanel: 'cyPanel'
}
export default class LayoutService {
  init(props, context) {
    this.container = props.container
    this.eleContainer = new Map()
    this.render()
  }
  render() {
    const $el = $(`<div/>`).appendTo($(this.container))
    this.el = $el.get(0)
    const toolbarContainer = $(`<div/>`).appendTo($el).get(0)
    const cyInfoEditorContainer = $(`<div/>`).appendTo($el).get(0)
    const cyPanelContainer = $(`<div/>`).appendTo($el).get(0)
    this.eleContainer.set(LayoutServiceContainer.toolbar, toolbarContainer)
    this.eleContainer.set(LayoutServiceContainer.cyInfoEditor, cyInfoEditorContainer)
    this.eleContainer.set(LayoutServiceContainer.cyPanel, cyPanelContainer)
  }

  dispose() {
    $(this.el).remove()
  }
  getContainer(containerName) {
    return this.eleContainer.get(containerName)
  }
}