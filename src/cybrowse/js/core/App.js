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
		let manager = new Manager()
		let cybrowseCore = new CybrowseCore()
		manager.init()
		cybrowseCore.init({
			container: props.container,
			manager: manager
		})
	}
}

function CybrowseCore() {
	let _this = this
	let $container
	let $view
		//** manager **//
	let manager, service

	/**view**/
	this.init = _.bind(init)

	/**base**/
	function init(props) {
		$container = props.container
		manager = props.manager
		view_init()
	}

	/**service**/
	function view_init() {
		view_repaint()
	}

	function view_getTemplate() {
		return `<div class='class-app'>
			<div class='app-title'>
				<div class='app-toolbar-wrap' data-toolbar></div>
			</div>
			<div class='app-content'>
				<div class='app-editor-wrap container-fluid' data-editor></div>
				<div class='app-cytoscape-wrap container-fluid' data-cytoscape></div>
			</div>
		</div>`
	}

	function view_repaint() {
		$container.empty()
		$view = $(view_getTemplate())
		$container.append($view)
		let cybrowseView = new CybrowseView()
		cybrowseView.init({
			toolbarContainer: $container.find("[data-toolbar]"),
			editorContainer: $container.find("[data-editor]"),
			cytoscapeContainer: $container.find("[data-cytoscape]"),
			manager: manager,
			service: {}
		})
	}

}

function CybrowseView() {
	let manager
	let toolbar
	let service
	let composer
	let listener
	this.init = function (props) {
		manager = props.manager
		composer = new EditorCytoscapeComposer()
		toolbar = new Toolbar()
		service = props.service
		toolbar.init({
			container: props.toolbarContainer,
			manager: manager,
			service: {
				onLoadLocalStorageData: _.bind(onLoadLocalStorageData),
				onLoad: _.bind(onLoad),
				save: _.bind(save),
				saveAsPng: _.bind(saveAsPng),
				saveAsJpeg: _.bind(saveAsJpeg),
			}
		})
		composer.init({
			editorContainer: props.editorContainer,
			cytoscapeContainer: props.cytoscapeContainer,
			manager: manager,
			service: {
				setManagerUpdateListener: _.bind(setManagerUpdateListener),
				emitManagerUpdateEvent: _.bind(emitManagerUpdateEvent)
			}
		})
	}

	function loadLocalStorageData() {
		manager.getCybrowseManager().loadLocalStorageData()
		composer.repaint()
	}

	function load(data) {
		manager.getCybrowseManager().load(data)
		composer.repaint()
	}

	function onLoadLocalStorageData() {
		loadLocalStorageData()
	}

	function onLoad(data) {
		load(data)
	}

	function save() {
		manager.getConfigManager().save()
	}

	function saveAsPng() {
		manager.getCybrowseManager().save()
	}

	function saveAsJpeg() {
		manager.getCybrowseManager().save()
	}

	function setManagerUpdateListener(_listener) {
		listener = _listener
	}

	function emitManagerUpdateEvent() {
		listener && listener()
	}
}

function EditorCytoscapeComposer() {
	let editor
	let cytoscape
	let service
	let manager
	this.init = function (props) {
		manager = props.manager
		editor = new Editor()
		cytoscape = new Cytoscape()
		service = props.service
		editor.init({
			container: props.editorContainer,
			manager: manager,
			emitManagerUpdateEvent: _.bind(emitManagerUpdateEvent),
		})
		cytoscape.init({
			container: props.cytoscapeContainer,
			manager: manager,
			setManagerUpdateListener: _.bind(setManagerUpdateListener)
		})
	}
	this.repaint = _.bind(repaint)

	function repaint() {
		editor.repaint()
		cytoscape.repaint()
	}

	function setManagerUpdateListener(cb) {
		service.setManagerUpdateListener && service.setManagerUpdateListener(cb)
	}

	function emitManagerUpdateEvent() {
		return service.emitManagerUpdateEvent && service.emitManagerUpdateEvent()
	}
}
