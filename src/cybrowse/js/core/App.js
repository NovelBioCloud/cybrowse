import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import Toolbar from './Toolbar'
import Editor from './Editor'
import Cytoscape from './Cytoscape'
import Manager from './Manager'

export default function App() {
	let _this = this
	let $container
	let $view
		//** manager **//
	let manager

	let toolbar = new Toolbar()
	let editor = new Editor()
	let cytoscape = new Cytoscape()
	let dataService = getDataService()
	let viewService = getViewService()
	let eventService = getEventService()
	let base = getBase()
	this.init = (props) => {
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
				manager = new Manager()
				manager.init(cb)
			}
		}
	}

	function getViewService() {
		return {
			getTemplate: () => {
				return `<div class='class-app'>
          <div class='app-title'>
            <div class='app-toolbar-wrap' data-toolbar>toolbar</div>
          </div>
          <div class='app-content'>
            <div class='app-editor-wrap' data-editor>editor</div>
            <div class='app-cytoscape-wrap' data-cytoscape>cytoscape</div>
          </div>
        </div>`
			},
			init: () => {
				$view = $(viewService.getTemplate())
				$container.empty()
				$container.append($view)
				toolbar.init({
					container: $container.find("[data-toolbar]"),
					manager: manager
				})
				editor.init({
					container: $container.find("[data-editor]"),
					manager: manager
				})
				cytoscape.init({
					container: $container.find("[data-cytoscape]"),
					manager: manager,
					initializedCallback: (cytoscape) => {
						toolbar.setCytoscape(cytoscape)
						editor.setCytoscape(cytoscape)
					}
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
