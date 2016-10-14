import $ from 'jquery'
import _ from 'lodash'
import EventEmitter from 'events'
import { NodeStyleName, EdgeStyleName, NodeStyleModel, EdgeStyleModel } from '../../../../base/cytoscape/styles'
export default class Background {
  constructor() {

  }
  init(props, context) {
    this.props = props
    this.context = context
    const backgroundView = new BackgroundView()
    backgroundView.init({
      container: props.container
    })
    const currentStyleService = this.context.services.currentStyleService
    const viewPanelService = this.context.services.viewPanelService
    const style = currentStyleService.getStyle()
    const styleModel = new NodeStyleModel(NodeStyleName.backgroundColor, currentStyleService)
    setTimeout(() => {
      styleModel.setDefaultValue('#f2f2f2')
      viewPanelService.updateStyle()
    }, 4000)
    const defaultValue = new DefaultValue()
    this.defaultValue = defaultValue
    defaultValue.init({
      defaultValue: '',
      value: '',
      valueType: '',
      container: backgroundView.getContainer('defaultValue')
    }, Object.assign({
      callbacks: {
        onChange: () => {

        },
        onRemove: () => {

        },
        onReset: () => {

        },
        onStyleUpdate: () => {

        }
      }
    }, context))

    const mapping = new Mapping()
    this.mapping = mapping
    mapping.init({
      container: backgroundView.getContainer('mapping'),
      mappingContent: backgroundView.getContainer('mappingContent')
    }, Object.assign({
      callbacks: {
        onClick: () => {

        },
        onColumnSelect: () => {

        },
        onMappingTypeSelect: () => {

        },
        onChange: () => {

        },
        onRemove: () => {

        },
        onReset: () => {

        },
        onNodeUpdate: () => {

        },
        onStyleUpdate: () => {

        }
      }
    }, context))
    const bypass = new Bypass()
    this.bypass = bypass
    bypass.init({
      container: backgroundView.getContainer('bypass')
    }, Object.assign({
      callbacks: {
        onChange: () => {
        },
        onRemove: () => {
        },
        onReset: () => {
        },
        onNodeSelect: () => {
        },
        onNodeUnselect: () => {
        },
        onStyleUpdate: () => {
        }
      }
    }, context))

  }
  update() {
    this.defaultValue.update()
    this.mapping.update()
    this.bypass.update()
  }
}
const ValueType = {
  integer: 'integer',
  color: 'color'
}
class BackgroundView {
  init(props, context) {
    this._panels = new Map()
    const $el = $('<div/>').appendTo($(props.container))
    const $defaultValue = $('<div/>').appendTo($el)
    const $mapping = $('<div/>').appendTo($el)
    const $bypass = $('<div/>').appendTo($el)
    const $mappingContent = $('<div/>').appendTo($el)
    this._panels.set('defaultValue', $defaultValue.get(0))
    this._panels.set('mapping', $mapping.get(0))
    this._panels.set('bypass', $bypass.get(0))
    this._panels.set('mappingContent', $mappingContent.get(0))
  }
  getContainer(name) {
    return this._panels.get(name)
  }
}
class DefaultValue {
  init(props, context) {
    this.$el = $('<div/>').appendTo($(props.container))
    this.$el.html('defaultValue')
  }
  update() {
    console.log('update')
  }
}
class Mapping {
  init(props, context) {
    this.$el = $('<div/>').appendTo($(props.container))
    this.$el.html('Mapping')
  }
  update() {
    console.log('update')
  }
}
class Bypass {
  init(props, context) {
    this.$el = $('<div/>').appendTo($(props.container))
    this.$el.html('Bypass')
  }
  update() {
    console.log('update')
  }
}
