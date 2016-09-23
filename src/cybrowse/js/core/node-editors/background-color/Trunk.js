import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'

export default function Trunk() {
	let _this = this,
		props, $container, $view,
		manager,
		base = getBase(),
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
				manager = props.manager
			}
		}
	}

	function getViewService() {
		return {
			getTemplate: function () {
				return `<div>
          <span>currentValue</span>
          <button class='fn-trunk-edit btn btn-sm'>edit</button>
        </div>`
			},
			init: function () {
				$view = $(viewService.getTemplate())
				$container.append($view)
        $view.find('.fn-trunk-edit').click(()=>{
          let name = prompt("","")
          console.log(name)
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
