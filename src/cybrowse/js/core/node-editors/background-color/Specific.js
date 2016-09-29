import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import ColorEditor from '../_component/color-editor/ColorEditor'
export default function Specific() {
	let _this = this,
		props, $container, $view, manager, nodeId

	this.init = init
	this.updateData = updateData

	function init(props) {
		data_init(props)
		view_init()
	}

	function updateData(_nodeId) {
		nodeId = _nodeId
		view_update()
	}

	function updateSpecificData(styleValue) {
		if (nodeId) {
			manager.getConfigManager().emitEvent({
				type: 'node.style.specific.data.update',
				data: {
					styleName: 'background-color',
					idName: nodeId,
					styleValue: styleValue
				}
			})
			manager.getCytoscapeManager().updateCytoscapeView()
			view_update()
		}
	}

	function removeSpecificData() {
		if (nodeId) {
			manager.getConfigManager().emitEvent({
				type: 'node.style.specific.data.remove',
				data: {
					styleName: 'background-color',
					idName: nodeId
				}
			})
			manager.getCytoscapeManager().updateCytoscapeView()
			view_update()
		}
	}
	/**data**/
	function data_init(_props) {
		props = _props
		$container = props.container
		manager = props.manager
	}

	function data_computeStyleValue() {
		let styleValue = ''
		if (nodeId) {
			let config = manager.getConfigManager().getData()
			let specificDatas = config.style.node.specific['background-color'].data
			let specificData = _.find(specificDatas, {
				idName: nodeId
			})
			if (specificData && specificData.styleValue) {
				styleValue = specificData.styleValue
			}
		}
		return styleValue
	}
	/**view**/
	function view_init() {
		view_paint()
		view_didMount()
	}

	function view_update() {
		$view && $view.remove()
		view_paint()
	}

	function view_didMount() {
		manager.getSpecificEditorManager().addNodeSpecificEditor('node-background-color', _this)
	}

	function view_paint() {
		$view = $("<div/>")
		$view.appendTo($container)
		if (nodeId) {
			let styleValue = data_computeStyleValue()
			let colorEditor = ColorEditor.newInstance()
			colorEditor.init({
				container: $view,
				onChange: updateSpecificData.bind(this),
				value: styleValue
			})
		}
	}
}