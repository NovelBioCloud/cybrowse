import $ from 'jquery'
import _ from 'lodash'
import async from 'async'
import assert from 'assert'
import immutable from 'immutable'
import postal from 'postal'
import PropertySelector from './PropertySelector'
import PropertyEditor from './PropertyEditor'

export default function NodeEditor() {
	let _this = this
	let props
	let $container
	let $view
	let manager

	this.init = init
	this.repaint = repaint

	function init(props) {
		data_init(props)
		view_init()
	}

	function repaint() {
		$view.remove()
		view_render()
	}

	function data_init(_props) {
		props = _props
		$container = props.container
		manager = props.manager
	}


	function view_init() {
		view_render()
	}

	function view_render() {
		$view = $(view_getTemplate())
		$container.append($view)
		let propertySelector = new PropertySelector()
		let propertyEditor = new PropertyEditor()
		propertySelector.init({
			container: $view.find('.fn-property-selector-wrap'),
			onChange: (property, selected) => {
				propertyEditor.rerenderEditor(property, selected)
			}
		})
		propertyEditor.init({
			container: $view.find('.fn-property-editor-wrap'),
			manager: manager,
		})
	}

	function view_getTemplate() {
		return `<div>
					<div class='fn-property-selector-wrap'></div>
          <div class='fn-property-editor-wrap'></div>
        </div>`
	}
}
