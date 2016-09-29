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
		view_repaint()
		manager.getCytoscapeManager().updateCytoscapeStyle()
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
	}

	function view_repaint() {
		$view.remove()
		$view = view_getInitView()
		$container.append($view)
	}

	function view_getDefaultStyleTemplate() {
		return `
			<div>
        <div><input type='color' class='fn-trunk-edit' value='<%=styleValue%>'/></div>
      </div>`
	}

	function view_getCustomStyleTemplate() {
		return `
			<div>
				<div>
					<input type='color' class='fn-trunk-edit' value='<%=styleValue%>'/>
					<button class='fn-trunk-remove btn btn-sm btn-default'>
						<i class='fa fa-fw fa-trash'/>
					</button>
				</div>
			</div>`
	}

	function view_init() {
		$view = view_getInitView()
		$container.append($view)
	}

	function view_getInitView() {
		let config = manager.getConfigManager().getData()
		let nodeTrunkData = config.style.node.trunk['background-color']
		let $view
		let styleValue
		let template
		if (nodeTrunkData && nodeTrunkData.styleValue) {
			styleValue = nodeTrunkData.styleValue
			template = view_getCustomStyleTemplate()
		} else {
			let defaultTrunkData = config.defaultStyle.node.trunk['background-color']
			styleValue = defaultTrunkData.styleValue
			template = view_getDefaultStyleTemplate()
		}
		$view = $(_.template(template)({
			styleValue
		}))
		$view.find('.fn-trunk-edit').change((event) => {
			updateNodeTrunkStyle(event.target.value)
		})
		$view.find('.fn-trunk-remove').click(() => {
			removeNodeTrunkStyle()
		})
		return $view
	}
}