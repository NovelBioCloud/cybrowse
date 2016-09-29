import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import MappingColumn from './MappingColumn'
import MappingType from './MappingType'
import MappingContent from './MappingContent'

export default function Mapping() {
	let _this = this
	let props
	let $container
	let $view
	let base = getBase()
	let dataService = getDataService()
	let viewService = getViewService()
	let eventService = getEventService()
	let manager
	let cytoscapeInstance
	let context
	let mappingColumn, mappingType, mappingContent
	let viewState = {
		showDetail: true
	}
	this.init = function (props, context) {
		base.init(props, context)
	}
	this.getView = function () {
		return base.getView()
	}

	function getBase() {
		return {
			init: function (props, context) {
				dataService.init(props, context)
				viewService.render()
			},
			getView: function () {
				return $view
			},
			updateConfig: function (property, mappingType, mappingValue, value) {
				dataService.updateConfig(property, mappingType, mappingValue, value)
				mappingContent.update()
			},
			removeMapping: function () {
				dataService.removeMapping()
				viewService.render()
			},
			addMapping: function () {
				dataService.addMapping()
				viewService.render()
			},
			updateMappingContent: function () {
				mappingContent && mappingContent.update()
			},
			showDetail: function () {

			},
			toggle: function () {

			}
		}
	}

	function getDataService() {
		return {
			init: (_props, _context) => {
				props = _props
				context = _context
				$container = props.container
				manager = props.manager
			},
			updateConfig: (property, mappingType, mappingValue, value) => {
				let configManager = manager.getConfigManager()
				let cytoscaeManager = manager.getCytoscapeManager()
				configManager.emitEvent({
					type: 'node.style.mapping.data.update',
					data: {
						styleName: 'background-color',
						propertyName: property,
						mappingType: mappingType,
						propertyValue: mappingValue,
						styleValue: value
					}
				})
				cytoscaeManager.updateCytoscapeView()
			},
			addMapping: () => {
				let configManager = manager.getConfigManager()
				configManager.emitEvent({
					type: 'node.style.mapping.update',
					data: {
						styleName: 'background-color',
						mappingType: 'discrete',
						mappingColumn: ''
					}
				})
				let cytoscapeManager = manager.getCytoscapeManager()
				cytoscapeManager.updateCytoscapeView()
			},
			removeMapping: () => {
				let configManager = manager.getConfigManager()
				configManager.emitEvent({
					type: 'node.style.mapping.remove',
					data: {
						styleName: 'background-color'
					}
				})
				let cytoscapeManager = manager.getCytoscapeManager()
				cytoscapeManager.updateCytoscapeView()
			}
		}
	}

	function getViewService() {
		return {
			render: () => {
				let configManager = manager.getConfigManager()
				let config = configManager.getData()
				let mappingData = config.style.node.mapping['background-color']
				console.log(mappingData)
				if (!mappingData.state || mappingData.state === 'init') {
					viewService.renderInitView()
				} else {
					viewService.renderInitedView()
				}
			},
			renderInitView: () => {
				$view && $view.remove()
				$view = $(_.template(viewService.getInitStateTemplate())({}))
				$view.appendTo($container)
				mappingColumn = null
				mappingType = null
				mappingContent = null
				$view.find('.fn-mapping-add').click(() => {
					base.addMapping()
				})
			},
			renderInitedView: () => {
				$view && $view.remove()
				$view = $(_.template(viewService.getInitedStateTemplate())({}))
				$view.appendTo($container)
				mappingColumn = new MappingColumn()
				mappingType = new MappingType()
				mappingContent = new MappingContent()
				mappingColumn.init({
					container: $view.find('.fn-background-mapping-column-wrap'),
					onChange: () => {
						let property = mappingColumn.getValue()
						let mappingTypeValue = mappingType.getValue()
						base.updateConfig(property, mappingTypeValue, '', '')
					},
					manager: manager
				})
				mappingType.init({
					container: $view.find('.fn-background-mapping-type-wrap'),
					onChange: () => {
						let property = mappingColumn.getValue()
						let mappingTypeValue = mappingType.getValue()
						base.updateConfig(property, mappingTypeValue, '', '')
					},
					manager: manager
				})
				mappingContent.init({
					container: $view.find('.fn-background-mapping-content-wrap'),
					mappingColumn: mappingColumn,
					mappingType: mappingType,
					manager: manager,
					onChange: (mappingValue, value) => {
						let property = mappingColumn.getValue()
						let mappingTypeValue = mappingType.getValue()
						base.updateConfig(property, mappingTypeValue, mappingValue, value)
					}
				})
				$view.find('.fn-mapping-remove').click(() => {
					base.removeMapping()
				})
			},
			renderDiscreteView: () => {
				$view && $view.remove()
				$view = $(_.template(viewService.getInitedStateTemplate())({}))
				$view.appendTo($container)
				mappingColumn = new MappingColumn()
				mappingType = new MappingType()
				mappingContent = new MappingContent()
				mappingColumn.init({
					container: $view.find('.fn-background-mapping-column-wrap'),
					value: '',
					onChange: () => {
						base.updateMappingContent()
					},
					manager: manager
				})
				mappingType.init({
					container: $view.find('.fn-background-mapping-type-wrap'),
					value: '',
					onChange: () => {
						base.updateMappingContent()
					},
					manager: manager
				})
				mappingContent.init({
					container: $view.find('.fn-background-mapping-content-wrap'),
					mappingColumn: mappingColumn,
					mappingType: mappingType,
					manager: manager,
					value: {},
					onChange: (mappingValue, value) => {
						let property = mappingColumn.getValue()
						let mappingTypeValue = mappingType.getValue()
						base.updateConfig(property, mappingTypeValue, mappingValue, value)
					}
				})
				$view.find('.fn-mapping-remove').click(() => {
					base.removeMapping()
				})
			},
			getInitStateTemplate: () => {
				return `<div>
					<div>
						<div>
							<button class='btn btn-sm btn-default fn-mapping-add'>
								<i class='fa fa-fw fa-plus'></i>
							</button>
						</div>
					</div>
				</div>`
			},
			getInitedStateTemplate: () => {
				return `<div>
					<div>
						<div>
							<button class='btn btn-sm btn-default fn-mapping-remove'>
								<i class='fa fa-fw fa-trash'></i>
							</button>
						</div>
						<div>
							<div class='fn-background-mapping-column-wrap'></div>
							<div class='fn-background-mapping-type-wrap'></div>
							<div class='fn-background-mapping-content-wrap'></div>
						</div>
					</div>
				</div>`
			}
		}
	}

	function getEventService() {
		return {}
	}
}
