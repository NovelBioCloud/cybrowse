import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import {
	NodeEditor
} from './node-editors'
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
	this.init = _.bind(init)
	this.repaint = _.bind(repaint)

	function init(props) {
		data_init(props)
		view_init()
	}

	function repaint() {
		$view.remove()
		view_init()
	}

	function updateDefaultStyle(name) {
		manager.getConfigManager().updateDefaultStyle(name)
		editorTab.repaint()
		props.emitManagerUpdateEvent()
	}

	function emitManagerUpdateEvent() {
		props.emitManagerUpdateEvent()
	}

	function data_init(_props) {
		props = _props
		manager = props.manager
		$container = $(props.container)
		tabState = {
			view: 'node'
		}
	}

	function data_loadDefaultConfig(cb) {
		cb()
	}

	function view_getTemplate() {
		return `
			<div >
				<div class='fn-editor-config-selector-container'></div>
				<div class='fn-editor-editor-tab-container'></div>
      </div>`
	}

	function view_init() {
		$view = $(view_getTemplate())
		$container.append($view)
		configSelector = new ConfigSelector()
		configSelector.init({
			manager: manager,
			onConfigChange: (name) => {
				updateDefaultStyle(name)
			},
			container: $view.find(".fn-editor-config-selector-container")
		})
		editorTab = new EditorTab()
		editorTab.init({
			manager: manager,
			container: $view.find(".fn-editor-editor-tab-container"),
			service: {
				emitManagerUpdateEvent
			}
		})
	}

}

function EditorTab() {
	let _this = this,
		$container, $view, props, manager, service, nodeEditor
	this.init = init
	this.repaint = repaint

	/** base **/
	function init(props) {
		data_init(props)
		view_init()
	}

	function repaint() {
		nodeEditor.repaint()
	}
	/** service **/
	function data_init(_props) {
		props = _props
		$container = props.container
		manager = props.manager
		service = props.service
	}

	function view_init() {
		$view = $(_.template(view_getTemplate())({}))
		$view.appendTo($container)
		nodeEditor = new NodeEditor()
		nodeEditor.init({
			container: $view.find('.fn-node-editor-container'),
			manager: manager,
			service: {
				emitManagerUpdateEvent: service.emitManagerUpdateEvent
			}
		})
	}

	function view_getTemplate() {
		return `<div >
			<ul class="nav nav-tabs nav-justified" role="tablist">
				<li role="presentation" class="active">
					<a href="#editor_node" role="tab" data-toggle="tab" data-tab-name='node'>节点信息</a>
				</li>
				<li role="presentation">
					<a href="#editor_edge" role="tab" data-toggle="tab" data-tab-name='edge'>连线信息</a>
				</li>
				<li role="presentation">
					<a href="#editor_general" role="tab" data-toggle="tab" data-tab-name='general'>全局信息</a>
				</li>
			</ul>
			<!-- Tab panes -->
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane fade in active" id="editor_node">
					<div style='padding-top:15px'>
						<div class='fn-node-editor-container'></div>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane fade" id="editor_edge">
					<div style='padding-top:15px'>
						<div class='fn-edge-editor-container'>edge</div>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane fade" id="editor_general">
					<div style='padding-top:15px'>
						<div class='fn-network-editor-container'>network</div>
					</div>
				</div>
			</div>
		</div>`
	}
}
