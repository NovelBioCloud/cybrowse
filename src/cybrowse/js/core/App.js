import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import {} from '../lib/bootstrap'
import Toolbar from './Toolbar'
import Editor from './Editor'
import Cytoscape from './Cytoscape'
import Manager from './Manager'

export default function App() {
	let _this = this
	let props
	let $container
	let manager = new Manager()
	let dataService = getDataService()
	let viewService = getViewService()
	let eventService = getEventService()
	let base = getBase()
	let context = new Map()
	let parentContext
	let cybrowseView = new CybrowseView()
	this.init = (props, context) => {
		base.init(props, context)
	}
	this.getView = () => {
		return $view
	}

	function getBase() {
		return {
			init: (props, context) => {
				dataService.init(props, context, () => {
					viewService.init()
				})
			}
		}
	}

	function getDataService() {
		return {
			init: (_props, _context, cb) => {
				props = _props
				parentContext = _context
				$container = $(props.container)
				manager.init(cb)
			},
		}
	}

	function getViewService() {
		return {
			init: () => {
				cybrowseView.init({
					container: $container
				})
			}
		}
	}

	function getEventService() {
		return {
			init: () => {}
		}
	}


}

function CybrowseView() {
	let _this = this
	let $container
	let $view
		//** manager **//
	let manager = new Manager()

	let toolbar = new Toolbar()
	let editor = new Editor()
	let cytoscape = new Cytoscape()
	let dataService = getDataService()
	let viewService = getViewService()
	let eventService = getEventService()
	let base = getBase()
	let context = new Map()
	this.init = (props) => {
		console.log('init')
		base.init(props)
	}
	this.getView = () => {
		return $view
	}

	function getBase() {
		return {
			init: (props) => {
				async.series([
						(cb) => {
							dataService.init(props)
							dataService.initManager(cb)
            }, (cb) => {
							viewService.init()
							eventService.init()
							cb()
            }
          ],
					(err, results) => {})
			}
		}
	}

	function getDataService() {
		return {
			init: (props) => {
				$container = $(props.container)
			},
			initManager: (cb) => {
				manager.init(cb)
			}
		}
	}

	function getViewService() {
		return {
			getTemplate: () => {
				return `<div class='class-app'>
          <div class='app-title'>
            <div class='app-toolbar-wrap' data-toolbar></div>
          </div>
          <div class='app-content'>
            <div class='app-editor-wrap container-fluid' data-editor></div>
            <div class='app-cytoscape-wrap container-fluid' data-cytoscape></div>
          </div>
        </div>`
			},
			init: () => {
				console.log(context)
				$view = $(viewService.getTemplate())
				$container.append($view)
				toolbar.init({
					container: $container.find("[data-toolbar]"),
					manager: manager
				}, context)
				editor.init({
					container: $container.find("[data-editor]"),
					manager: manager
				}, context)
				cytoscape.init({
					container: $container.find("[data-cytoscape]"),
					manager: manager,
					initializedCallback: (cytoscape) => {
						context.set('cytoscapeInstance', cytoscape)
						toolbar.setCytoscape(cytoscape)
						editor.setCytoscape(cytoscape)
					}
				}, context)
			}
		}
	}

	function getEventService() {
		return {
			init: () => {}
		}
	}


}
