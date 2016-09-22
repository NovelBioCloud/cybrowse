import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import BackgroundColor from '../node-editors/BackgroundColor'

export default function PropertyEditor() {
	let _this = this,
		props, $container, $view, base = getBase(),
		dataService = getDataService(),
		viewService = getViewService(),
		eventService = getEventService(),
		editors = new Map(),
		manager,
		cytoscapeInstance,
		context

	this.init = function (props, context) {
		base.init(props, context)
	}
	this.getView = function () {
		return $view
	}
	this.rerenderEditor = function (type, selected) {
		base.rerenderEditor(type, selected)
	}

	function getBase() {
		return {
			init: function (props, context) {
				dataService.init(props, context)
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
			init: function (_props, _context) {
				props = _props
				context = _context
				$container = props.container
				manager = props.manager
				cytoscapeInstance = props.cytoscapeInstance
			}
		}
	}

	function getViewService() {
		return {
			getTemplate: function () {
				return `<div/>`
			},
			init: function () {
				$view = $(viewService.getTemplate())
				$container.append($view)
				viewService.initBackground()
			},
			initBackground: function () {
				let backgroundColor = new BackgroundColor()
				editors.set('backgroundColor', backgroundColor)
				backgroundColor.init({
					container: $view,
					manager: manager,
					cytoscapeInstance: cytoscapeInstance
				}, context)
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
