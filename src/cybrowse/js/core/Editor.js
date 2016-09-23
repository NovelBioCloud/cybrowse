import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import NodeEditor from './NodeEditor'
import ConfigSelector from './ConfigSelector'
export default function Editor() {
	let _this = this
	let props
	let manager
	let $container
	let $view
	let tabState
	let defaultConfig
	let configSelector
	let editorTab
	let base = getBase()
	let dataService = getDataService()
	let viewService = getViewService()
	let eventService = getEventService()
	let cytoscapeInstance
	let context
	this.init = function (props, context) {
		base.init(props, context)
	}
	this.setCytoscape = (cytoscape) => {
		base.setCytoscape(cytoscape)
	}

	function getBase() {
		return {
			init: (props, context) => {
				dataService.init(props, context)
				viewService.init()
				eventService.init()
			},
			setCytoscape: (cy) => {},
			updateDefaultConfig: (name) => {
				manager.updateDefaultConfig(name)
				editorTab.updateDefaultConfig()
			}
		}
	}

	function getDataService() {
		return {
			init: (_props, _context) => {
				props = _props
				context = _context
				manager = props.manager
				$container = $(props.container)
				tabState = {
					view: 'node'
				}
			},
			loadDefaultConfig: (cb) => {
				// manager.getDefaultConfigManager.getData()
				cb()
			}
		}
	}

	function getViewService() {
		return {
			getTemplate: () => {
				return `<div >
					<div class='fn-editor-config-selector-container'></div>
					<div class='fn-editor-editor-tab-container'></div>
        </div>`
			},
			init: () => {
				$view = $(viewService.getTemplate())
				$container.append($view)
				configSelector = new ConfigSelector()
				configSelector.init({
					manager: manager,
					onConfigChange: (name) => {
						base.updateDefaultConfig(name)
					},
					container: $view.find(".fn-editor-config-selector-container")
				})
				editorTab = new EditorTab()
				editorTab.init({
					manager: manager,
					container: $view.find(".fn-editor-editor-tab-container")
				}, context)
			},
		}
	}

	function getEventService() {
		return {
			init: () => {}
		}
	}
}

function EditorTab() {
	let _this = this,
		$container, $view, props, manager

	this.init = (props) => {
		init(props)
	}
	this.updateDefaultConfig = () => {
		updateDefaultConfig()
	}

	/** base **/
	function init(_props) {
		props = _props
		$container = props.container
		manager = props.manager
		view_init()
	}

	function updateDefaultConfig() {
		$container.empty()
		view_init()
	}
	/** service **/

	function view_init() {
		$view = $(_.template(view_getTemplate())({}))
		$view.appendTo($container)
		let nodeEditor = new NodeEditor()
		nodeEditor.init({
			container: $view.find('.fn-node-editor-container'),
			manager: manager
		})
	}

	function view_getTemplate() {
		return `<div >
			<ul class="nav nav-tabs nav-justified" role="tablist">
				<li role="presentation" class="active">
					<a href="#home" role="tab" data-toggle="tab">节点信息</a>
				</li>
				<li role="presentation">
					<a href="#profile" role="tab" data-toggle="tab">连线信息</a>
				</li>
				<li role="presentation">
					<a href="#messages" role="tab" data-toggle="tab">全局信息</a>
				</li>
			</ul>
			<!-- Tab panes -->
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane fade in active" id="home">
					<div style='padding-top:15px'>
						<div class='fn-node-editor-container'></div>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane fade" id="profile">
					<div style='padding-top:15px'>
						<div class='fn-edge-editor-container'>edge</div>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane fade" id="messages">
					<div style='padding-top:15px'>
						<div class='fn-network-editor-container'>network</div>
					</div>
				</div>
			</div>
		</div>`
	}
}
