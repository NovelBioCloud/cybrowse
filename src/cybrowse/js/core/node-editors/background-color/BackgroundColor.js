import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import Trunk from './Trunk'
import Mapping from './Mapping'
import Specific from './Specific'

export default function BackgroundColor() {
	let _this = this
	let props
	let $container
	let $view
	let base = getBase()
	let dataService = getDataService()
	let viewService = getViewService()
	let manager
	let context
	this.init = function (props, context) {
		base.init(props, context)
	}
	this.getView = function () {
		return base.getView()
	}
	this.getPropertyName = function () {
		return 'background-color'
	}
	this.show = function () {
		base.show()
	}
	this.hide = function () {
		base.hide()
	}

	function getBase() {
		return {
			init: function (props, context) {
				dataService.init(props, context)
				viewService.init()
			},
			getView: function () {
				return $view
			},
			show: function () {
				$view.removeClass("hidden")
			},
			hide: function () {
				$view.addClass("hidden")
			},
			render: function () {
				viewService.render()
			},
		}
	}

	function getDataService() {
		return {
			init: function (_props, _context) {
				props = _props
				context = _context
				$container = props.container
				manager = props.manager
			}
		}
	}

	function getViewService() {
		return {
			init: () => {
				viewService.render()
			},
			render: () => {
				if ($view) {
					$view.remove()
				}
				let template = _.template(viewService.getTemplate())({})
				$view = $(template)
				$container.append($view)
				let trunk = new Trunk()
				let mapping = new Mapping()
				let specific = new Specific()
				trunk.init({
					container: $view.find('.fn-background-trunk-wrap'),
					manager: manager,
					emitManagerUpdateEvent: props.emitManagerUpdateEvent
				})
				mapping.init({
					container: $view.find('.fn-background-mapping-wrap'),
					manager: manager
				})
				specific.init({
					container: $view.find('.fn-background-specific-wrap'),
					manager: manager,
				})
			},
			getTemplate: () => {
				return `<div>
          <div>
						<label>背景颜色</label>
					</div>
          <div>
						<div class='fn-background-trunk-wrap'></div>
					</div>
					<div>
						<div class='fn-background-mapping-wrap'></div>
					</div>
          <div>
            <div class='fn-background-specific-wrap'></div>
          </div>
        </div>`
			}
		}
	}

}
