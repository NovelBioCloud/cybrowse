
import $ from 'jquery'
import Cytoscape from './cytoscape'
import CyStyleService from '../cytoscape/cyStyleService'
class ViewPanel {

  init(props, context, options) {
    this.container = props.container
    this.props = props
    this.context = context
    this.render()
    this.initServices()
  }
  render() {
    const $el = $('<div/>').appendTo($(this.container))
    this.el = $el.get(0)
    const cytoscapeContainer = $(`<div/>`, {
      class: 'cy-panel-service--cytoscape'
    }).appendTo($el)
    this.cytoscape = new Cytoscape()
    this.cytoscape.init({
      container: cytoscapeContainer
    }, this.context)
  }
  initServices() {
  }

  dispose() {

  }
}

export default class ViewPanelService {
  init(props, context) {
    this.props = props
    this.context = context
    this.services = this.context.services
    this.render()
    this.initServices()
    this.registerCommand()
    this.registerListener()
  }
  initServices() {
    const services = Object.assign({}, this.context.services)
    this.services = services
    const context = {
      services: services
    }
  }
  render(force) {

    if (force) {
      this.remove()
    }
    if (!this.viewPanel) {
      this.viewPanel = new ViewPanel()
      this.viewPanel.init({
        container: this.getViewPanelContainer()
      }, this.context)
    }
  }
  remove() {
    if (this.ViewPanel) {
      this.ViewPanel.dispose()
      this.ViewPanel == null
    }
  }
  dispose() {
    this.remove()
  }
  getViewPanelContainer() {
    if (!this.viewPanelContainer) {
      this.viewPanelContainer = $('<div/>', {
        class: 'cy-info-editor-service--cy-info-editor-container'
      }).appendTo($(this.props.container)).get(0)
    }
    return this.viewPanelContainer
  }
  registerCommand() {

  }
  registerListener() {
    // const cyStyleService = this.services.cyStyleService
    // cyStyleService.on('update', function () {
    //   console.log('cyStyleService updated')
    // })

    // setTimeout(() => {
    //   console.log('trigger cyStyleService update')
    //   cyStyleService.update()
    // }, 2000)
  }
}