import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'

export default function Specific() {
	let _this = this,
		props, $container, $view, base = getBase(),
		dataService = getDataService(),
		viewService = getViewService(),
		eventService = getEventService()

	this.init = function (props) {
		base.init(props)
	}
	this.getView = function () {
		return $view
	}

	function getBase() {
		return {
			init: function (props) {
				dataService.init(props)
				viewService.init()
				eventService.init()
			},

		}
	}

	function getDataService() {
		return {
			init: function (_props) {
				props = _props
        $container = props.container
					//TODO
			}
		}
	}

	function getViewService() {
		return {
			getTemplate: function () {
				return `<div>template</div>`
			},
			init: function () {
				$view = $(viewService.getTemplate())
				$container.append($view)

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
