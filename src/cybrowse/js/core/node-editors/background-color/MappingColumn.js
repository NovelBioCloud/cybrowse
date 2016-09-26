import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'

export default function Column() {
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
				onChange && onChange(data)
			},
			getValue: function () {
				return $view.find('.fn-column-select').val()
			},
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
			getProperties: function () {
				return manager.getConfigManager().getProperties()
			}
		}
	}

	function getViewService() {
		return {
			getTemplate: function () {
				return `<div>
          <select class='fn-column-select form-control'>
            <option value=''>---</option>
            <% _.each(properties, function(item){ %>
            <option value='<%=item%>'><%=item%></option>
            <% })%>
          </select>
        </div>`
			},
			init: function () {
				let properties = dataService.getProperties()
				let template = _.template(viewService.getTemplate())({
					properties: properties
				})
				$view = $(template)
				$container.append($view)
				$view.find('.fn-column-select').change(function (event) {
					base.onChange($(this).val())
				})
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
