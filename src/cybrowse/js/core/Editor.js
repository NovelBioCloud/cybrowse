import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import {} from '../base/bootstrap'
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
	this.init = function (props) {
		base.init(props)
	}
	this.setCytoscape = (cytoscape) => {
		base.setCytoscape(cytoscape)
	}

	function getBase() {
		return {
			init: (props) => {
				async.series([
						(cb) => {
							dataService.init(props)
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
			setCytoscape: (cy) => {
				console.log(cy)
			}
		}
	}

	function getDataService() {
		return {
			init: (_props) => {
				props = _props
				manager = props.manager
				$container = $(props.container)
        tabState = {
          view: 'node'
        }
			},
			loadDefaultConfig: (cb) => {
				$.getJSON('data/data.json', (data) => {
					console.log(data)
					cb()
				})
			}

		}
	}

	function getViewService() {
		return {
			getTemplate: () => {
				return `<div>
          <div>
            <div class='fn-node-editor-title'>节点信息</div>
            <div class='fn-edge-editor-title'>连线信息</div>
            <div class='fn-network-editor-title'>全局信息</div>
          </div>
          <div>
            <div class='fn-node-editor-container'></div>
            <div class='fn-edge-editor-container'>edge</div>
            <div class='fn-network-editor-container'>network</div>
          </div>
        </div>`
			},
			init: () => {
				$view = $(viewService.getTemplate())
				$container.append($view)
				nodeEditor = new NodeEditor()
				nodeEditor.init({
					manager: manager,
					container: $view.find(".fn-node-editor-container")
				})
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
