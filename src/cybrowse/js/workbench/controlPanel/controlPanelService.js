import $ from 'jquery'
import TabPanelService from './tabPanelService'
class ControlPanel {

  init(props, context, options) {
    this.container = props.container
    this.render()
  }
  render() {
    const $el = $('<div/>').appendTo($(this.container))
    this.el = $el.get(0)
    $(`<div/>`, {
      text: 'test controlPanel'
    }).appendTo($el)
  }
  dispose() {

  }
}

export default class ControlPanelService {
  init(props, context) {
    this.props = props
    this.context = context
    this.render()
  }
  render() {
    let tabPanelService = new TabPanelService()
    tabPanelService.init({
      container: this.props.container
    })
    return

  }
  remove() {
    if (this.controlPanel) {
      this.controlPanel.dispose()
      this.controlPanel == null
    }
  }
  dispose() {
    this.remove()
  }
  getHtmlControlPanel() {
    if (!this.controlPanel) {
      this.controlPanel = $('<div/>', {
        class: ''
      }).appendTo($(this.props.container)).get(0)
    }
    return this._controlPanel
  }
}