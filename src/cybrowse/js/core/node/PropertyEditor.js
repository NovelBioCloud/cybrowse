import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import Background from '../node-editors/Background'

export default function PropertyEditor() {
	let _this = this,
		props, $container, $view, base = getBase(),
		dataService = getDataService(),
		viewService = getViewService(),
		eventService = getEventService(),
		editors = new Map(),
		manager

	this.init = function (props) {
		base.init(props)
	}
	this.getView = function () {
		return $view
	}
	this.rerenderEditor = function (type, selected) {
		base.rerenderEditor(type, selected)
	}

	function getBase() {
		return {
			init: function (props) {
				dataService.init(props)
				viewService.init()
				eventService.init()
			},
			rerenderEditor: function (type, selected) {
				let editor = editors.get(type)
				if (!editor) {
					return
				}
				if (selected) {
					editor.show()
				} else {
					editor.hide()
				}
			}
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
				return `<div></div>`
			},
			init: function () {
				$view = $(viewService.getTemplate())
				$container.append($view)
				viewService.initBackground()
			},
			initBackground: function () {
				let background = new Background()
				editors.set('background', background)
				background.init({
					container: $view,
					manager: manager
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
