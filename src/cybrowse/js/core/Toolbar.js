import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'

export default function Toolbar() {
	let _this = this
	let $container
	let $view
	let defaultConfig
	let cytoscape
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
	this.setCytoscape = (cytoscape) => {
		base.setCytoscape(cytoscape)
	}

	function getBase() {
		return {
			init: (props) => {
				async.series([
					(callback) => {
						dataService.init(props)
						dataService.loadDefaultConfig(callback)
          }, (callback) => {
						viewService.init()
						eventService.init()
						callback()
          }
        ])
			},
			setCytoscape: (_cytoscape) => {
				console.log(_cytoscape)
				cytoscape = _cytoscape
				viewService.initialized()
				eventService.initialized()
			}
		}
	}

	function getDataService() {
		return {
			init: (props) => {
				$container = $(props.container)
			},
			loadDefaultConfig: (callback) => {
				$.getJSON('data/data.json', (data) => {
					console.log(data)
					callback()
				})
			}

		}
	}

	function getViewService() {
		return {
			getTemplate: () => {
				return `<div><button>文件选择</button></div>`
			},
			getInitializedTemplate: () => {
				return `<div><button type='button' class='fn-print'>文件选择</button></div>`
			},
			init: () => {
				$view = $(viewService.getTemplate())
				$container.empty()
				$container.append($view)
			},
			initialized: () => {
				$view = $(viewService.getInitializedTemplate())
				$container.empty()
				$container.append($view)
			}
		}
	}

	function getEventService() {
		return {
			init: () => {
				postal.channel().subscribe('defaultConfig.reload', () => {
					base.reloadDefaultConfig()
				})
			},
			initialized: () => {
				$view.find('.fn-print').click(() => {
					console.log(cytoscape.json())
				})
			}
		}
	}


}
