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
	this.init = (props) => {
		let cybrowseView = new CybrowseView()
		let manager = new Manager()
		manager.init(() => {
			cybrowseView.init({
				container: props.container,
				manager: manager
			})
		})
	}
}

function CybrowseView() {
	let _this = this
	let $container
	let $view
		//** manager **//
	let manager
	let viewService = getViewService()
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
				$container = props.container
				manager = props.manager
				viewService.init()
			},
			reload: (data) => {
				manager.getDataManager().load()
				viewService.repaint()
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
				$view = $(viewService.getTemplate())
				$container.append($view)
				let cybrowseView2 = new CybrowseView2()
				cybrowseView2.init({
					toolbarContainer: $container.find("[data-toolbar]"),
					editorContainer: $container.find("[data-editor]"),
					cytoscapeContainer: $container.find("[data-cytoscape]"),
					manager: manager,
					onReload: (data) => {
						base.reload(data)
					}
				})
			},
			repaint: () => {
				$container.empty()
				viewService.init()
			}
		}
	}
}

function CybrowseView2() {
	this.init = function (props) {
		let manager = props.manager
		let toolbar = new Toolbar()
		let editor = new Editor()
		let cytoscape = new Cytoscape()
		toolbar.init({
			container: props.toolbarContainer,
			manager: manager,
			onReload: props.onReload
		})
		editor.init({
			container: props.editorContainer,
			manager: manager
		})
		cytoscape.init({
			container: props.cytoscapeContainer,
			manager: manager,
			initializedCallback: (cytoscape) => {
				manager.setCytoscape(cytoscape)
			}
		})
	}
}
