import $ from 'jquery'
import Cytoscape from './cytoscape'
import CyStyleService from '../cytoscape/cyStyleService'
class CyPanel {

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
      text: 'test CyPanel'
    }).appendTo($el)
    this.cytoscape = new Cytoscape()
    this.cytoscape.init({
      container: cytoscapeContainer
    }, this.context)
  }
  initServices() {
    const services = this.getInfraServices()

  }
  getInfraServices() {
    if (!this.infraServices) {
      this.infraServices = this.context.services.clone()
    }
    return this.infraServices
  }
  dispose() {

  }
}

export default class CyPanelService {
  init(props, context) {
    this.props = props
    this.context = context
    this.services = this.context.services
    this.render()
    this.registerCommand()
    this.registerListener()
  }
  render(force) {

    if (force) {
      this.remove()
    }
    if (!this.CyPanel) {
      this.CyPanel = new CyPanel()
      this.CyPanel.init({
        container: this.getCyPanelContainer()
      }, this.context)
    }
  }
  remove() {
    if (this.CyPanel) {
      this.CyPanel.dispose()
      this.CyPanel == null
    }
  }
  dispose() {
    this.remove()
  }
  getCyPanelContainer() {
    if (!this.CyPanelContainer) {
      this.CyPanelContainer = $('<div/>', {
        class: 'cy-info-editor-service--cy-info-editor-container'
      }).appendTo($(this.props.container)).get(0)
    }
    return this.CyPanelContainer
  }
  registerCommand() {

  }
  registerListener() {
    const cyStyleService = this.services.find(CyStyleService)
    cyStyleService.on('update', function () {
      console.log('cyStyleService updated')
    })

    setTimeout(() => {
      console.log('trigger cyStyleService update')
      cyStyleService.update()
    }, 2000)
  }
}