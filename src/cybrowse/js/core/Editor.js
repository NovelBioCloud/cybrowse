import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import NodeEditor from './NodeEditor'
export default function Editor() {
	let _this = this
	let props
	let manager
	let $container
	let $view
	let tabState
	let defaultConfig
	let nodeEditor
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
				async.series([
						(cb) => {
							dataService.init(props, context)
							cb()
            }, (cb) => {
							dataService.loadDefaultConfig(cb)
            }, (cb) => {
							viewService.init()
							cb()
            }, (cb) => {
							eventService.init()
							cb()
            }
          ],
					(err, results) => {})
			},
			reloadDefaultConfig: () => {

			},
			setCytoscape: (cy) => {}
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
			},
			init: () => {	console.log(context)
				$view = $(viewService.getTemplate())
				$container.append($view)
				nodeEditor = new NodeEditor()
				nodeEditor.init({
					cytoscapeInstance: cytoscapeInstance,
					manager: manager,
					container: $view.find(".fn-node-editor-container")
				}, context)
				viewService.showTab(tabState)
			},
			showTab: (tabState) => {
				if (tabState.view === 'node') {

				}
			}
		}
	}

	function getEventService() {
		return {
			init: () => {
				postal.channel().subscribe('defaultConfig.reload', () => {
					base.reloadDefaultConfig()
				})
			}
		}
	}
}
