import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import cytoscape from 'cytoscape'
import configs from './common/configs'

export default function Cytoscape() {
	let _this = this
	let $container
	let $view
	let defaultConfig
	let cytoscapeManager
	let cytoscapeInstance
	let props
	let manager
	let setManagerUpdateListener
	this.init = _.bind(init)
	this.repaint = _.bind(repaint)

	function repaint() {
		$view.remove()
		view_init()
	}

	function init(props) {
		data_init(props)
		view_init()
	}


	function data_init(_props) {
		props = _props
		$container = $(props.container)
		manager = props.manager
		setManagerUpdateListener = props.setManagerUpdateListener
	}

	function view_resetStyle() {
		let configManager = manager.getConfigManager()
		cytoscapeInstance.style().resetToDefault().fromJson(configManager.getStyle()).update()
	}

	function view_getTemplate() {
		return `<div class='class-cytoscape'>
          <div class='cytoscape-view' data-cytoscape-view></div>
        </div>`
	}

	function view_init() {
		console.log('update cytoscape')
		$view = $(view_getTemplate())
		$container.append($view)
		let cytoscapeView = $container.find("[data-cytoscape-view]")
		let configManager = manager.getConfigManager()
		let config = configManager.getData()
		cytoscapeInstance = cytoscape({
			container: cytoscapeView,
			style: configManager.getStyle(),
			// elements: _.concat(configManager.getNodes(), configManager.getEdges()),
			layout: configManager.getLayout(),
		});
		cytoscapeInstance.add(_.concat(configManager.getNodes(), configManager.getEdges()))
		/**初始化cytoscape**/
		cytoscapeManager = manager.getCytoscapeManager()
		cytoscapeManager.setCytoscape(cytoscapeInstance)
		cytoscapeInstance.on('tap', function (event) {
			var evtTarget = event.cyTarget;

			if (evtTarget === cytoscapeInstance) {
				manager.getSpecificEditorManager().dispatchEvent('node.update', null)
				manager.getSpecificEditorManager().dispatchEvent('edge.update', null)
			}
		});
		cytoscapeInstance.on('tap', 'node', function (event) {
			var node = event.cyTarget;
			manager.getSpecificEditorManager().dispatchEvent('node.update', node.id())
		});
		cytoscapeInstance.on('tap', 'edge', function (event) {
			var node = event.cyTarget;
			manager.getSpecificEditorManager().dispatchEvent('node.update', node.id())
		});
	}

}