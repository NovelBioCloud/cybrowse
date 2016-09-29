import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import ColorEditor from '../_component/color-editor/ColorEditor'

export default function MappingContent() {
	let _this = this,
		props, $container, $view, base = getBase(),
		dataService = getDataService(),
		viewService = getViewService(),
		eventService = getEventService(),
		manager,
		mappingColumn,
		mappingType,
		onChange
	this.init = function (props) {
		base.init(props)
	}
	this.getView = function () {
		return $view
	}
	this.update = function () {
		base.update()
	}

	function getBase() {
		return {
			init: function (props) {
				dataService.init(props)
				viewService.render()
				eventService.init()
			},
			update: function () {
				viewService.render()
			},
			onChange: function (mappingValue, value) {
				onChange && onChange(mappingValue, value)
			}
		}
	}

	function getDataService() {
		return {
			init: function (_props) {
				props = _props
				$container = props.container
				manager = props.manager
				mappingColumn = props.mappingColumn
				mappingType = props.mappingType
				onChange = props.onChange
			},
			getMappingContentItems: function () {
				return manager.getConfigManager().getData().style.node.mapping['background-color'].data.mappingContent || []
			},
			getPropertyValues: function () {
				return manager.getConfigManager().getPropertyValuesByPropertyName(mappingColumn.getValue())
			}
		}
	}

	function getViewService() {
		return {
			getTemplate: function () {
				return `<div></div>`
			},
			render: function () {
				$container.empty()
				$view = $(viewService.getTemplate())
				$view.appendTo($container)
				let propertyValues = dataService.getPropertyValues()
				let mappingContentItems = dataService.getMappingContentItems()
				propertyValues.forEach((propertyValue) => {
					let mappingContentInput = new MappingContentInput()
					let mappintContentItem = _.find(mappingContentItems, {
						propertyValue
					})
					let styleValue = mappintContentItem ? mappintContentItem.styleValue : ""
					mappingContentInput.init({
						container: $view,
						propertyValue: propertyValue,
						styleValue: styleValue,
						onChange: (propertyValue, styleValue) => {
							base.onChange(propertyValue, styleValue)
						}
					})
				})

			}
		}
	}

	function getEventService() {
		return {
			init: function () {

			}
		}
	}
}

function MappingContentInput() {
	let _this = this,
		props, $container, $view, propertyValue, styleValue, onChange

	this.init = init

	function init(props) {
		data_init(props)
		view_init()
	}

	function changeStyleValue(newStyleValue) {
		onChange && onChange(propertyValue, newStyleValue)
	}

	function data_init(_props) {
		props = _props
		$container = props.container
		propertyValue = props.propertyValue
		styleValue = props.styleValue
		onChange = props.onChange
	}

	function view_init() {
		$view && $view.remove()
		$view = $(_.template(view_getTemplate())({
			propertyValue,
			styleValue
		}))
		$view.appendTo($container)
		let colorEditor = ColorEditor.newInstance()
		colorEditor.init({
			container: $view.find('.fn-mapping-content-color'),
			onChange: changeStyleValue.bind(this),
			value: styleValue
		})
		$view.find('.fn-mapping-content-input').change((event) => {
			changeStyleValue($(event.target).val())
		})
	}

	function view_getTemplate() {
		return `
			<div>
				<label><%=propertyValue%></label>
				<div class='fn-mapping-content-color'></div>
				<input type='text' class='form-control fn-mapping-content-input hidden' value='<%=styleValue%>'/>
			</div>
		`
	}
}