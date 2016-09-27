import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'

export default function Trunk() {
	let _this = this,
		props, $container, $view, manager, service
	this.init = init
	this.getView = getView

	function init(props) {
		data_init(props)
		view_init()
	}

	function getView(_props) {
		return $view
	}

	function updateNodeTrunkStyle(styleValue) {
		data_updateTrunkStyle(styleValue)
	}

	function removeNodeTrunkStyle() {
		data_updateTrunkStyle(null)
	}

	function data_init(_props) {
		props = _props
		$container = props.container
		manager = props.manager
		service = props.service
	}

	function data_updateTrunkStyle(styleValue) {
		let configManager = manager.getConfigManager()
		configManager.updateNodeTrunkStyle('background-color', styleValue)
		view_repaint()
		props.emitManagerUpdateEvent()
	}

	function view_repaint() {
		$view.remove()
		$view = view_getInitView()
		$container.append($view)
	}

	function view_getTemplate() {
		return `
			<div>
        <span><%=value%></span>
        <button class='fn-trunk-edit btn btn-sm'>edit</button>
				<button class='fn-trunk-remove btn btn-sm'>remove</button>
      </div>`
	}

	function view_init() {
		$view = view_getInitView()
		$container.append($view)
	}

	function view_getInitView() {
		let config = manager.getConfigManager().getData()
		let nodeTrunkData = config.style.node.trunk
		let defaultTrunkData = config.defaultStyle.node.trunk
		let styleValue = defaultTrunkData['background-color'].styleValue
		if (nodeTrunkData['background-color'] && nodeTrunkData['background-color'].styleValue) {
			styleValue = nodeTrunkData['background-color'].styleValue
		}

		let $view = $(_.template(view_getTemplate())({
			value: styleValue
		}))
		$view.find('.fn-trunk-edit').click(() => {
			let value = prompt("", "")
			updateNodeTrunkStyle(value)
		})
		$view.find('.fn-trunk-remove').click(() => {
			removeNodeTrunkStyle()
		})
		return $view
	}
}
