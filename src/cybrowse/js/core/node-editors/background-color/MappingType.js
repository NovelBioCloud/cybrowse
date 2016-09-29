import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'

export default function MappingType() {
	let _this = this,
		props, $container, $view, base = getBase(),
		dataService = getDataService(),
		viewService = getViewService(),
		eventService = getEventService(),
		manager,
		onChange

	this.init = function (props) {
		base.init(props)
	}
	this.getView = function () {
		return $view
	}
	this.getValue = function () {
		return base.getValue()
	}

	function getBase() {
		return {
			init: function (props) {
				dataService.init(props)
				viewService.init()
				eventService.init()
			},
			onChange: function (data) {
				typeValue = data
				onChange && onChange(data)
			},
			getValue: function () {
				return $view.find('.fn-mapping-type-select').val()
			},
			getMappingTypeValue: function () {
				return manager.getConfigManager().getData().style.node.mapping['background-color'].data.mappingType
			}
		}
	}

	function getDataService() {
		return {
			init: function (_props) {
				props = _props
				$container = props.container
				manager = props.manager
				onChange = props.onChange
					//TODO
			},
			getMappingTypes: function () {
				return [['discrete', 'discrete mapping']]
			},
			getMappingTypeValue: function () {
				return manager.getConfigManager().getData().style.node.mapping['background-color'].data.mappingType
			}
		}
	}

	function getViewService() {
		return {
			getTemplate: function () {
				return `<div>
          <select class='fn-mapping-type-select form-control'>
            <% _.each(types, function([key, label]){ %>
            <option value='<%=key%>'><%=label%></option>
            <% })%>
          </select>
        </div>`
			},
			init: function () {
				let types = dataService.getMappingTypes()
				let template = _.template(viewService.getTemplate())({
					types: types
				})
				$view = $(template)
				$container.append($view)
				if (dataService.getMappingTypeValue()) {
					$view.find('.fn-column-select').val(dataService.getMappingTypeValue())
				}
				$view.find('.fn-column-select').change(function (event) {
					base.onChange($(this).val())
				})
				$view.addClass('hidden')
			},

		}
	}

	function getEventService() {
		return {
			init: function () {

			}
		}
	}
}
