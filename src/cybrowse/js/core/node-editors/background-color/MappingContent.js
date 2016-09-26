import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'

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
				viewService.init()
				eventService.init()
			},
			update: function () {
				viewService.init()
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
			}
		}
	}

	function getViewService() {
		return {
			getTemplate: function () {
				return `<div>
          <% values.forEach((value)=>{%>
            <div>
              <label><%=value%></label>
              <input type='text' class='form-control fn-mapping-content-input' data-mapping-value='<%=value%>'/>
            </div>
          <% }) %>
        </div>`
			},
			init: function () {
				$container.empty()
				let cybrowseManager = manager.getCybrowseManager()
				let columnValue = mappingColumn.getValue()
				let typeValue = mappingType.getValue()
				let values = manager.getConfigManager().getValuesByProperty(columnValue)
				let template = _.template(viewService.getTemplate())({
					values: values
				})
				$view = $(template)
				$view.on('.fn-mapping-content-input').change(function (event) {
					let target = event.target
					base.onChange($(target).data('mapping-value'), $(target).val())
				})
				$container.append($view)
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
