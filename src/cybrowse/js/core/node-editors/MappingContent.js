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
		column,
		mappingType
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
				viewService.render()
			}
		}
	}

	function getDataService() {
		return {
			init: function (_props) {
				props = _props
				$container = props.container
				manager = props.manager
				column = props.column
				mappingType = props.mappingType
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
              <input type='text'/>
            </div>
          <% }) %>
        </div>`
			},
			init: function () {
				viewService.render()
			},
			render: function () {
				$container.empty()
        let dataManager = manager.getDataManager()
				let columnValue = column.getValue()
				let typeValue = mappingType.getValue()
        let values = dataManager.getValuesByProperty(columnValue)
        let template = _.template(viewService.getTemplate())({
          values: values
        })
				$view = $(template)
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
